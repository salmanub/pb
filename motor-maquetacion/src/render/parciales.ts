/**
 * Parciales comunes: funciones puras JSON validado → string HTML escapado.
 * Ninguna decide contenido; sólo omiten lo que viene vacío.
 */
import type { Bloque, Cliente, Emisor, Meta, Seccion, Totales } from '../schema';
import { esc, escMultilinea, escUrl, eur } from './escape';

/** Une trozos no vacíos con un separador ya escapado. */
function unir(trozos: (string | undefined)[], sep: string): string {
  return trozos.filter((t): t is string => !!t && t.trim() !== '').map(esc).join(sep);
}

// ── Cabecera y pie repetidos ──────────────────────────────────────────────

export function cabecera(emisor: Emisor): string {
  const contacto = unir([emisor.telefono, emisor.email, emisor.web], ' <span style="color:#0E6A64">▪</span> ');
  const identidad = unir([emisor.nombre, emisor.rol], ' — ');
  return (
    '<header class="repetida cabecera">' +
    '<div class="marca">perito<span class="punto">.</span><span class="dominio">barcelona</span></div>' +
    (identidad || contacto
      ? '<div class="contacto">' +
        (identidad ? '<div>' + identidad + '</div>' : '') +
        (contacto ? '<div>' + contacto + '</div>' : '') +
        '</div>'
      : '') +
    '</header>'
  );
}

export function pie(meta: Meta, emisor: Emisor, resumen?: string): string {
  const izquierda = '<span class="doc">' + esc(meta.numero) + '</span>' + (resumen ? ' · ' + esc(resumen) : '');
  return (
    '<footer class="repetida pie">' +
    '<span>' + izquierda + '</span>' +
    (emisor.web ? '<span>' + esc(emisor.web) + '</span>' : '') +
    '</footer>'
  );
}

// ── Título ────────────────────────────────────────────────────────────────

const TITULOS: Record<string, string> = {
  presupuesto: 'Presupuesto',
  factura: 'Factura',
  informe: 'Informe',
};

export function titulo(tipo: string, meta: Meta): string {
  return (
    '<div class="titulo">' +
    '<h1>' + esc(TITULOS[tipo] ?? tipo) + '</h1>' +
    '<div class="num">' + esc(meta.numero) + '</div>' +
    '</div>' +
    (meta.vigencia ? '<div class="vigencia">' + esc(meta.vigencia) + '</div>' : '')
  );
}

// ── Partes ────────────────────────────────────────────────────────────────

export function partes(emisor: Emisor, cliente: Cliente, rotuloCliente: string): string {
  const datosEmisor = [
    emisor.nif ? 'NIF · ' + esc(emisor.nif) : '',
    emisor.direccion ? escMultilinea(emisor.direccion) : '',
  ].filter(Boolean);

  const datosCliente = [
    cliente.nif ? 'NIF · ' + esc(cliente.nif) : '',
    cliente.direccion ? escMultilinea(cliente.direccion) : '',
    cliente.telefono ? esc(cliente.telefono) : '',
  ].filter(Boolean);

  return (
    '<div class="partes">' +
    '<div class="parte">' +
    '<div class="rotulo">De</div>' +
    '<div class="nombre">' + esc(emisor.nombre) + '</div>' +
    (emisor.firma ? '<div class="rol">' + esc(emisor.firma) + '</div>' : '') +
    (datosEmisor.length ? '<div class="datos">' + datosEmisor.join('<br>') + '</div>' : '') +
    '</div>' +
    '<div class="parte caja">' +
    '<div class="rotulo">' + esc(rotuloCliente) + '</div>' +
    '<div class="nombre">' + esc(cliente.nombre) + '</div>' +
    (datosCliente.length ? '<div class="datos">' + datosCliente.join('<br>') + '</div>' : '') +
    '</div>' +
    '</div>'
  );
}

// ── Bloques ───────────────────────────────────────────────────────────────

const CLASE_ALINEACION: Record<string, string> = {
  izquierda: '',
  centro: 'al-centro',
  derecha: 'al-derecha',
};

/** Devuelve '' si el bloque no tiene nada que pintar. */
export function bloque(b: Bloque): string {
  switch (b.tipo) {
    case 'parrafo':
      return '<p class="parrafo ' + b.tono + '">' + escMultilinea(b.texto) + '</p>';

    case 'lista': {
      if (!b.items.length) return '';
      const etiqueta = b.estilo === 'numeros' ? 'ol' : 'ul';
      const items = b.items
        .map(
          (it) =>
            '<li>' +
            esc(it.texto) +
            (it.detalle ? '<span class="detalle">' + esc(it.detalle) + '</span>' : '') +
            '</li>',
        )
        .join('');
      return '<' + etiqueta + ' class="lista ' + b.estilo + '">' + items + '</' + etiqueta + '>';
    }

    case 'tabla': {
      if (!b.filas.length) return '';
      const cabeceras = b.columnas
        .map((c) => {
          const clase = CLASE_ALINEACION[c.alineacion];
          const ancho = c.ancho ? ' style="width:' + esc(c.ancho) + '"' : '';
          return '<th' + (clase ? ' class="' + clase + '"' : '') + ancho + '>' + esc(c.titulo) + '</th>';
        })
        .join('');
      const cuerpo = b.filas
        .map((fila) => {
          const celdas = fila.celdas
            .map((celda, i) => {
              const col = b.columnas[i];
              const clase = col ? CLASE_ALINEACION[col.alineacion] : '';
              const principal = i === 0 && celda.detalle ? ' principal' : '';
              return (
                '<td' + (clase || principal ? ' class="' + (clase + principal).trim() + '"' : '') + '>' +
                esc(celda.texto) +
                (celda.detalle ? '<span class="detalle">' + esc(celda.detalle) + '</span>' : '') +
                '</td>'
              );
            })
            .join('');
          return '<tr>' + celdas + '</tr>';
        })
        .join('');
      return '<table class="tabla"><thead><tr>' + cabeceras + '</tr></thead><tbody>' + cuerpo + '</tbody></table>';
    }

    case 'imagen': {
      const src = escUrl(b.src);
      if (!src) return '';
      const ancho = b.ancho ? ' style="width:' + esc(b.ancho) + '"' : '';
      return (
        '<figure class="imagen ' + (CLASE_ALINEACION[b.alineacion] || '') + '">' +
        '<img src="' + src + '" alt="' + esc(b.alt) + '"' + ancho + '>' +
        (b.pie ? '<figcaption>' + esc(b.pie) + '</figcaption>' : '') +
        '</figure>'
      );
    }

    case 'campos': {
      const items = b.items.filter((it) => it.valor !== '');
      if (!items.length) return '';
      return (
        '<div class="campos">' +
        items
          .map(
            (it) =>
              '<span class="k">' + esc(it.clave) + '</span>' +
              '<span class="v' + (it.destacado ? ' destacado' : '') + '">' + esc(it.valor) + '</span>',
          )
          .join('') +
        '</div>'
      );
    }

    case 'firma':
      return (
        '<div class="firma">' +
        b.etiquetas.map((e) => '<div class="linea">' + esc(e) + '</div>').join('') +
        '</div>'
      );
  }
}

/** Regla de oro: sección sin bloques con contenido = no se renderiza. */
export function seccion(s: Seccion): string {
  const cuerpo = s.bloques.map(bloque).filter((h) => h !== '').join('');
  if (!cuerpo) return '';
  return (
    '<section class="seccion ' + s.variante + '" data-id="' + esc(s.id) + '">' +
    (s.titulo ? '<h2>' + esc(s.titulo) + '</h2>' : '') +
    cuerpo +
    '</section>'
  );
}

export function secciones(lista: Seccion[]): string {
  return lista.map(seccion).join('');
}

// ── Totales ───────────────────────────────────────────────────────────────

export function totales(t: Totales | undefined): string {
  if (!t || !t.lineas.length) return '';
  const filas = t.lineas
    .map((l) => {
      const clases = [l.total ? 'total' : '', l.resaltada ? 'resaltada' : ''].filter(Boolean).join(' ');
      return (
        '<tr' + (clases ? ' class="' + clases + '"' : '') + '>' +
        '<td class="k">' + esc(l.etiqueta) + '</td>' +
        '<td class="v">' + esc(eur(l.importe, t.moneda)) + '</td>' +
        '</tr>'
      );
    })
    .join('');
  return '<div class="totales-wrap"><table class="totales"><tbody>' + filas + '</tbody></table></div>';
}
