/**
 * Contrato Apps Script ↔ motor.
 *
 * _docJson() en gestorCRM/apps-script/20_MotorMaquetacion.gs es un espejo
 * manual de este esquema. Este test carga ese .gs de verdad, lo ejecuta con
 * los mínimos stubs de Apps Script y comprueba que lo que produce valida
 * contra el esquema y se renderiza. Así el espejo no se desincroniza en
 * silencio: si alguien cambia el esquema y no el .gs, esto se rompe.
 *
 * Si el repo gestorCRM no está al lado de pb, los tests se saltan en vez de
 * fallar (el motor tiene que poder desarrollarse por separado).
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { erroresLegibles, validarDocumento } from '../src/schema';
import { renderHtml } from '../src/render/documento';

const DIR_GS = resolve(__dirname, '../../../gestorCRM/apps-script');
const RUTA_GS = resolve(DIR_GS, '20_MotorMaquetacion.gs');
const RUTA_EUR = resolve(DIR_GS, '05_Aceptacion.gs');
const hay = existsSync(RUTA_GS) && existsSync(RUTA_EUR);

/**
 * _eur() se toma del .gs real en lugar de copiarlo: el formato de los importes
 * de las celdas tiene que ser exactamente el que usa el CRM, y una copia a mano
 * se desincroniza (o se escapa mal) sin que nadie se entere.
 */
function fuenteEur(): string {
  const src = readFileSync(RUTA_EUR, 'utf8');
  const desde = src.indexOf('function _eur(');
  if (desde === -1) throw new Error('_eur no encontrado en 05_Aceptacion.gs');
  const hasta = src.indexOf('\n}', desde);
  if (hasta === -1) throw new Error('no se ha podido delimitar _eur');
  return src.slice(desde, hasta + 2);
}

/** Stubs mínimos de Apps Script y de los helpers que _docJson usa. */
function cargarDocJson(): (d: Record<string, unknown>, tipo?: string) => unknown {
  const fuente = readFileSync(RUTA_GS, 'utf8');
  const contexto = `
    var PropertiesService = { getScriptProperties: function () { return { getProperty: function () { return ''; } }; } };
    var UrlFetchApp = { fetch: function () { throw new Error('sin red en los tests'); } };
    var SpreadsheetApp = { getUi: function () { throw new Error('sin UI en los tests'); } };
    var ABAST_ES = { 'Visita': 'Visita técnica', 'Informe': 'Informe pericial', 'Prep. advocat': 'Preparación con el abogado', 'Compareixença': 'Comparecencia en sala' };
    var ABAST_AMPL_ES = { 'Visita': 'Visita adicional', 'Informe': 'Informe ampliado / contrainforme', 'Prep. advocat': 'Preparación del caso con abogado', 'Compareixença': 'Comparecencia (por sesión)' };
    function _emisorDatos() {
      return {
        nombre: 'Albert Vilardell Serra',
        firma: 'Perito Barcelona',
        rol: 'Ingeniero Civil · Colegiado ECCAT 16448',
        nif: '12345678Z',
        dir: 'Carrer Exemple 12, 08001 Barcelona',
        tel: '+34 614 194 985',
        email: 'info@perito.barcelona',
        web: 'perito.barcelona',
        iban: 'ES17 0182 9003 9502 0688 0826'
      };
    }
    ${fuenteEur()}
  `;
  // eslint-disable-next-line no-new-func
  return new Function(`${contexto}\n${fuente}\nreturn _docJson;`)() as ReturnType<typeof cargarDocJson>;
}

/** Presupuesto tal y como lo monta confirmarEmitirPresupuesto (14_Presupuesto.gs). */
const D_PRESUPUESTO = {
  tipo: 'presupuesto',
  docNum: 'PRE-2026/0042',
  date: '30/08/2026',
  dueDate: '29/09/2026',
  cName: 'Comunidad de Propietarios Riera Alta 8',
  cIdnum: 'NIF: H08123456',
  cAddress: 'Carrer de la Riera Alta 8, 08001 Barcelona',
  cPhone: '+34 933 000 000',
  body: 'Dictamen pericial sobre las filtraciones detectadas en el forjado.',
  items: [
    { name: 'Dictamen pericial por filtraciones', units: 1, price: 1400 },
    { name: 'Toma de muestras y ensayo de humedad', units: 2, price: 150 },
  ],
  tipus: 'particular',
  abast: [
    { clau: 'Visita', on: true },
    { clau: 'Informe', on: true },
    { clau: 'Prep. advocat', on: true },
    { clau: 'Compareixença', on: false, precioTxt: '350,00 € por sesión' },
  ],
  expediente: 'PB·2026·0117',
  pm: 'Pago del 100 % a la aceptación del presupuesto.',
  linkPago: 'https://perito.barcelona/pago/abc',
};

/** Factura tal y como la monta _emitirFacturaCore (14_Presupuesto.gs). */
const D_FACTURA = {
  tipo: 'factura',
  docNum: 'PB-2026/0031',
  date: '30/08/2026',
  dueDate: '29/09/2026',
  cName: 'Constructora Meridiana SL',
  cIdnum: 'NIF: B66112233',
  cAddress: 'Avinguda Meridiana 340, 08027 Barcelona',
  cPhone: '',
  body: '',
  items: [{ name: 'Auditoría de certificaciones y mediciones de obra', units: 1, price: 3200 }],
  tipus: 'empresa',
  qr: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  abast: [{ clau: 'Visita', on: true }],
  expediente: 'PB-2026-0117',
  presupuestoRef: 'PRE-2026/0042',
  pagado: false,
};

describe.skipIf(!hay)('contrato con _docJson de Apps Script', () => {
  const docJson = hay ? cargarDocJson() : (() => ({}));

  it('el presupuesto que monta Apps Script valida contra el esquema', () => {
    const r = validarDocumento(docJson(D_PRESUPUESTO, 'presupuesto'));
    if (!r.success) console.error(erroresLegibles(r.error));
    expect(r.success).toBe(true);
  });

  it('la factura que monta Apps Script valida contra el esquema', () => {
    const r = validarDocumento(docJson(D_FACTURA, 'factura'));
    if (!r.success) console.error(erroresLegibles(r.error));
    expect(r.success).toBe(true);
  });

  it('los totales los calcula Apps Script, no el motor', () => {
    const doc = validarDocumento(docJson(D_FACTURA, 'factura'));
    expect(doc.success).toBe(true);
    // base 3200 · IVA 672 · IRPF 15 % (empresa) −480 · total 3392
    const lineas = doc.data!.totales!.lineas;
    expect(lineas.map((l) => l.importe)).toEqual([3200, 672, -480, 3392]);
    expect(lineas.find((l) => l.total)?.etiqueta).toBe('Total a pagar');
  });

  it('un particular no lleva línea de IRPF', () => {
    const doc = validarDocumento(docJson(D_PRESUPUESTO, 'presupuesto'));
    const etiquetas = doc.data!.totales!.lineas.map((l) => l.etiqueta);
    expect(etiquetas.some((e) => e.includes('IRPF'))).toBe(false);
    // base 1400 + 2 × 150 = 1700
    expect(doc.data!.totales!.lineas[0].importe).toBe(1700);
  });

  it('los importes de las celdas y los de los totales usan el mismo formato', () => {
    // Las celdas las formatea Apps Script con _eur(); los totales, el motor con
    // eur(). Si divergen, el documento sale con dos formatos distintos.
    const doc = validarDocumento(docJson(D_PRESUPUESTO, 'presupuesto'));
    const html = renderHtml(doc.data!);
    // 1400 € en una celda y 1700 € en los totales: ambos con punto de millar.
    expect(html).toContain('1.400,00');
    expect(html).toContain('1.700,00');
    expect(html).not.toMatch(/>\s*1400,00/);
  });

  it('el prefijo "NIF:" se limpia antes de llegar al motor', () => {
    const doc = validarDocumento(docJson(D_FACTURA, 'factura'));
    expect(doc.data!.cliente.nif).toBe('B66112233');
  });

  it('el QR viaja como data: URI y sobrevive a la validación', () => {
    const doc = validarDocumento(docJson(D_FACTURA, 'factura'));
    const verifactu = doc.data!.secciones.find((s) => s.id === 'verifactu');
    expect(verifactu?.bloques[0]).toMatchObject({ tipo: 'imagen' });
    const html = renderHtml(doc.data!);
    expect(html).toContain('data:image/png;base64,');
  });

  it('sin abast no aparecen las secciones de alcance ni de ampliaciones', () => {
    const doc = validarDocumento(docJson({ ...D_FACTURA, abast: [] }, 'factura'));
    const html = renderHtml(doc.data!);
    expect(html).not.toContain('Servicios incluidos');
    expect(html).not.toContain('Ampliaciones disponibles');
  });

  it('sin objeto no aparece la sección Objeto', () => {
    const doc = validarDocumento(docJson({ ...D_PRESUPUESTO, body: '' }, 'presupuesto'));
    expect(renderHtml(doc.data!)).not.toContain('Objeto');
  });

  it('ambos documentos se renderizan enteros', () => {
    for (const d of [D_PRESUPUESTO, D_FACTURA]) {
      const doc = validarDocumento(docJson(d, d.tipo as string));
      const html = renderHtml(doc.data!);
      expect(html.startsWith('<!DOCTYPE html>')).toBe(true);
      expect(html).toContain(d.docNum);
      expect(html).toContain(d.cName);
    }
  });
});
