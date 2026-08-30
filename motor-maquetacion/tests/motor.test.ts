/**
 * Tests del motor de maquetación. Sin red: todo se ejercita en memoria,
 * incluido el handler HTTP (Request/Response son globales en Node 18+).
 */
import { describe, expect, it } from 'vitest';
import { Documento, Peticion, erroresLegibles, validarDocumento } from '../src/schema';
import { renderHtml, renderPdfPayload } from '../src/render/documento';
import { manejarPeticion } from '../src/index';
import { esc, escUrl, eur } from '../src/render/escape';

import presupuesto from './fixtures/presupuesto.json';
import factura from './fixtures/factura.json';

const TOKEN = 'token-de-prueba-1234';

/** Única lista de etiquetas que el motor puede emitir. Cualquier otra = inyección. */
const ETIQUETAS_PERMITIDAS = [
  'body', 'br', 'div', 'footer', 'h1', 'h2', 'head', 'header', 'html', 'li', 'main',
  'meta', 'p', 'section', 'span', 'style', 'table', 'tbody', 'td', 'th', 'thead',
  'title', 'tr', 'ul',
];
const ENV = { RENDER_TOKEN: TOKEN };

function peticion(cuerpo: unknown, opciones: { token?: string | null; metodo?: string } = {}): Request {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = opciones.token === undefined ? TOKEN : opciones.token;
  if (token) headers['x-auth-token'] = token;
  const metodo = opciones.metodo ?? 'POST';
  const init: RequestInit = { method: metodo, headers };
  if (metodo !== 'GET' && metodo !== 'HEAD') {
    init.body = typeof cuerpo === 'string' ? cuerpo : JSON.stringify(cuerpo);
  }
  return new Request('https://perito.barcelona/motor/render', init);
}

// (a) ─────────────────────────────────────────────────────────────────────

describe('schema · documento válido', () => {
  it('acepta un presupuesto completo', () => {
    const r = Documento.safeParse(presupuesto);
    expect(r.success).toBe(true);
  });

  it('acepta una factura completa', () => {
    const r = Documento.safeParse(factura);
    expect(r.success).toBe(true);
  });

  it('aplica los valores por defecto declarados', () => {
    const r = Documento.parse(factura);
    expect(r.meta.idioma).toBe('es');
    expect(r.totales?.moneda).toBe('EUR');
    expect(r.secciones[0].variante).toBe('normal');
  });

  it('normaliza a undefined los textos opcionales vacíos', () => {
    const r = Documento.parse({ ...factura, meta: { ...factura.meta, expediente: '   ' } });
    expect(r.meta.expediente).toBeUndefined();
  });
});

// (b) ─────────────────────────────────────────────────────────────────────

describe('schema · rechazo con error legible', () => {
  it('señala el campo y el motivo de un tipo equivocado', () => {
    const malo = { ...factura, totales: { lineas: [{ etiqueta: 'Base', importe: '3200' }] } };
    const r = Documento.safeParse(malo);
    expect(r.success).toBe(false);
    const errores = erroresLegibles(r.error!);
    expect(errores).toContainEqual({ campo: 'totales.lineas.0.importe', motivo: 'debe ser un número' });
  });

  it('rechaza un tipo de documento desconocido', () => {
    const r = validarDocumento({ ...factura, tipo: 'albaran' });
    expect(r.success).toBe(false);
    expect(erroresLegibles(r.error!)[0]).toEqual({
      campo: 'tipo',
      motivo: 'valor no admitido: "albaran". Válidos: presupuesto, factura, informe',
    });
  });

  it('rechaza un nombre de cliente vacío', () => {
    const r = Documento.safeParse({ ...factura, cliente: { nombre: '   ' } });
    expect(r.success).toBe(false);
    expect(erroresLegibles(r.error!)).toContainEqual({
      campo: 'cliente.nombre',
      motivo: 'cliente.nombre no puede estar vacío',
    });
  });

  it('rechaza un bloque de tipo inexistente', () => {
    const malo = {
      ...factura,
      secciones: [{ id: 's', bloques: [{ tipo: 'video', src: 'x' }] }],
    };
    const r = Documento.safeParse(malo);
    expect(r.success).toBe(false);
    expect(erroresLegibles(r.error!)[0].campo).toBe('secciones.0.bloques.0.tipo');
  });

  it('rechaza una imagen con esquema peligroso', () => {
    const malo = {
      ...factura,
      secciones: [{ id: 's', bloques: [{ tipo: 'imagen', src: 'javascript:alert(1)' }] }],
    };
    const r = Documento.safeParse(malo);
    expect(r.success).toBe(false);
    expect(erroresLegibles(r.error!)[0].motivo).toMatch(/data:image|https/);
  });

  it('el endpoint responde 422 con la lista de errores, nunca 500', async () => {
    const res = await manejarPeticion(peticion({ documento: { tipo: 'factura' } }), ENV);
    expect(res.status).toBe(422);
    expect(res.headers.get('Content-Type')).toContain('application/json');
    const cuerpo = (await res.json()) as { errores: { campo: string; motivo: string }[] };
    expect(cuerpo.errores.length).toBeGreaterThan(0);
    for (const e of cuerpo.errores) {
      expect(typeof e.campo).toBe('string');
      expect(e.motivo).toBeTruthy();
    }
    expect(cuerpo.errores.map((e) => e.campo)).toContain('documento.meta');
  });
});

// (c) ─────────────────────────────────────────────────────────────────────

describe('secciones vacías', () => {
  it('la sección "anexos" del fixture no llega al HTML', () => {
    const html = renderHtml(Documento.parse(presupuesto));
    expect(presupuesto.secciones.some((s) => s.id === 'anexos')).toBe(true);
    expect(html).not.toContain('data-id="anexos"');
    expect(html).not.toContain('Anexos');
  });

  it('una sección sin bloques no deja hueco ni título', () => {
    const doc = Documento.parse({
      ...factura,
      secciones: [{ id: 'vacia', titulo: 'Sección vacía', bloques: [] }],
    });
    const html = renderHtml(doc);
    expect(html).not.toContain('Sección vacía');
    expect(html).not.toContain('class="seccion');
  });

  it('una tabla sin filas y una lista sin ítems no se renderizan', () => {
    const doc = Documento.parse({
      ...factura,
      secciones: [
        {
          id: 'x',
          titulo: 'Título que no debe salir',
          bloques: [
            { tipo: 'tabla', columnas: [{ titulo: 'Concepto' }], filas: [] },
            { tipo: 'lista', items: [] },
          ],
        },
      ],
    });
    const html = renderHtml(doc);
    expect(html).not.toContain('Título que no debe salir');
    expect(html).not.toContain('<table class="tabla"');
  });

  it('un bloque de campos con todos los valores vacíos no se renderiza', () => {
    const doc = Documento.parse({
      ...factura,
      secciones: [{ id: 'x', bloques: [{ tipo: 'campos', items: [{ clave: 'Nº', valor: '' }] }] }],
    });
    expect(renderHtml(doc)).not.toContain('class="campos"');
  });

  it('sin totales no aparece la tabla de totales', () => {
    const sinTotales = { ...factura };
    delete (sinTotales as Record<string, unknown>).totales;
    expect(renderHtml(Documento.parse(sinTotales))).not.toContain('class="totales"');
  });

  it('los datos opcionales ausentes del emisor no dejan separadores sueltos', () => {
    const doc = Documento.parse({
      ...factura,
      emisor: { nombre: 'Albert Vilardell Serra', web: 'perito.barcelona' },
    });
    const html = renderHtml(doc);
    const bloqueEmisor = html.split('<div class="parte caja">')[0];
    expect(bloqueEmisor).not.toContain('NIF ·');
    expect(bloqueEmisor).not.toContain('class="rol"');
    expect(html).not.toContain(' — </div>');
    expect(html).not.toContain('▪ ▪');
  });
});

// (d) ─────────────────────────────────────────────────────────────────────

describe('escapado', () => {
  it('esc neutraliza los cinco caracteres peligrosos', () => {
    expect(esc('<script>"x" & \'y\'</script>')).toBe(
      '&lt;script&gt;&quot;x&quot; &amp; &#39;y&#39;&lt;/script&gt;',
    );
  });

  it('escUrl deja pasar data:image y https, y bloquea el resto', () => {
    expect(escUrl('data:image/png;base64,AAA')).toContain('data:image/png');
    expect(escUrl('https://perito.barcelona/a.png')).toContain('https://');
    expect(escUrl('javascript:alert(1)')).toBe('');
    expect(escUrl('data:text/html,<script>')).toBe('');
    expect(escUrl('http://inseguro.example/a.png')).toBe('');
  });

  it('el HTML no contiene ninguna etiqueta inyectada desde el JSON', () => {
    const doc = Documento.parse({
      ...factura,
      cliente: { nombre: '<script>alert("xss")</script>', nif: '"><img onerror=alert(1)>' },
      secciones: [
        {
          id: 'x',
          titulo: '<b>título</b>',
          bloques: [
            { tipo: 'parrafo', texto: "</style><script>fetch('//mal.example')</script>" },
            {
              tipo: 'tabla',
              columnas: [{ titulo: '<th onclick=x>' }],
              filas: [{ celdas: [{ texto: '</td><script>x</script>', detalle: "'\"><svg onload=1>" }] }],
            },
            { tipo: 'campos', items: [{ clave: '<i>k</i>', valor: '<i>v</i>' }] },
            { tipo: 'lista', items: [{ texto: '<img src=x onerror=1>' }] },
            { tipo: 'firma', etiquetas: ['<hr>'] },
          ],
        },
      ],
    });
    const html = renderHtml(doc);

    // Se inspeccionan las etiquetas realmente emitidas: el texto escapado puede
    // contener la subcadena "onerror=" sin que exista ningún atributo de evento.
    const etiquetas = (html.match(/<[^>]*>/g) ?? []).filter((t) => !t.startsWith('<!'));
    const nombres = new Set(
      etiquetas.map((t) => (t.match(/^<\s*\/?\s*([a-zA-Z][\w-]*)/) ?? [, ''])[1]!.toLowerCase()),
    );
    expect([...nombres].sort()).toEqual(ETIQUETAS_PERMITIDAS);
    for (const t of etiquetas) {
      expect(t).not.toMatch(/\son[a-z]+\s*=/i);
      expect(t).not.toMatch(/javascript:/i);
    }

    // Y el texto sigue estando, ya escapado.
    expect(html).toContain('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    expect(html).toContain('&lt;b&gt;título&lt;/b&gt;');
  });

  it('el único </style> del documento es el del propio motor', () => {
    const doc = Documento.parse({
      ...factura,
      secciones: [{ id: 'x', bloques: [{ tipo: 'parrafo', texto: '</style><style>body{display:none}' }] }],
    });
    expect(renderHtml(doc).split('</style>').length - 1).toBe(1);
  });

  it('eur formatea con miles, coma decimal y signo menos tipográfico', () => {
    // El separador de miles y el previo al símbolo son espacios duros (U+00A0).
    expect(eur(1700)).toBe('1.700,00 €');
    expect(eur(-480)).toBe('−480,00 €');
    expect(eur(1234567.5)).toBe('1.234.567,50 €');
  });
});

// (e) ─────────────────────────────────────────────────────────────────────

describe('snapshots', () => {
  it('presupuesto', () => {
    expect(renderHtml(Documento.parse(presupuesto))).toMatchSnapshot();
  });

  it('factura', () => {
    expect(renderHtml(Documento.parse(factura))).toMatchSnapshot();
  });

  it('payload para el Worker de PDF (factura)', () => {
    const payload = renderPdfPayload(Documento.parse(factura));
    expect(payload.margin).toEqual({ top: '26mm', right: '0mm', bottom: '20mm', left: '0mm' });
    expect(payload.footerHtml).toContain('pageNumber');
    expect({ headerHtml: payload.headerHtml, footerHtml: payload.footerHtml }).toMatchSnapshot();
  });
});

// ── Handler HTTP ──────────────────────────────────────────────────────────

describe('endpoint POST /motor/render', () => {
  it('devuelve text/html para una petición válida', async () => {
    const res = await manejarPeticion(peticion({ documento: presupuesto, salida: 'html' }), ENV);
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('text/html');
    const html = await res.text();
    expect(html.startsWith('<!DOCTYPE html>')).toBe(true);
    expect(html).toContain('PRE-2026/0042');
  });

  it('salida por defecto es html', () => {
    expect(Peticion.parse({ documento: factura }).salida).toBe('html');
  });

  it('el HTML no lleva nada de JavaScript', async () => {
    const res = await manejarPeticion(peticion({ documento: presupuesto }), ENV);
    const html = await res.text();
    expect(html).not.toMatch(/<script/i);
    expect(html).not.toMatch(/\son[a-z]+\s*=/i);
  });

  it('devuelve el payload de PDF en JSON cuando se pide', async () => {
    const res = await manejarPeticion(peticion({ documento: factura, salida: 'pdf-payload' }), ENV);
    expect(res.status).toBe(200);
    const cuerpo = (await res.json()) as Record<string, unknown>;
    expect(Object.keys(cuerpo).sort()).toEqual(['footerHtml', 'headerHtml', 'html', 'margin']);
    expect(typeof cuerpo.html).toBe('string');
  });

  it('401 sin token', async () => {
    const res = await manejarPeticion(peticion({ documento: factura }, { token: null }), ENV);
    expect(res.status).toBe(401);
  });

  it('401 con token incorrecto, y también si sólo cambia un carácter', async () => {
    expect((await manejarPeticion(peticion({ documento: factura }, { token: 'otro' }), ENV)).status).toBe(401);
    const casiIgual = TOKEN.slice(0, -1) + 'X';
    expect((await manejarPeticion(peticion({ documento: factura }, { token: casiIgual }), ENV)).status).toBe(401);
  });

  it('401 si el entorno no tiene secreto configurado', async () => {
    expect((await manejarPeticion(peticion({ documento: factura }), {})).status).toBe(401);
  });

  it('acepta el alias X-Motor-Key', async () => {
    const req = new Request('https://perito.barcelona/motor/render', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-motor-key': TOKEN },
      body: JSON.stringify({ documento: factura }),
    });
    expect((await manejarPeticion(req, ENV)).status).toBe(200);
  });

  it('400 con JSON malformado', async () => {
    const res = await manejarPeticion(peticion('{ esto no es json', {}), ENV);
    expect(res.status).toBe(400);
    const cuerpo = (await res.json()) as { errores: unknown[] };
    expect(cuerpo.errores).toHaveLength(1);
  });

  it('GET responde con el health-check', async () => {
    const res = await manejarPeticion(peticion({}, { metodo: 'GET', token: null }), ENV);
    expect(res.status).toBe(200);
    expect(await res.text()).toContain('OK');
  });

  it('405 con un método no soportado', async () => {
    const req = new Request('https://perito.barcelona/motor/render', { method: 'DELETE' });
    const res = await manejarPeticion(req, ENV);
    expect(res.status).toBe(405);
  });
});
