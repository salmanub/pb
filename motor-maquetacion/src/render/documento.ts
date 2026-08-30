/**
 * Una función de render por tipo de documento, sobre un armazón común.
 * Todas reciben el JSON YA VALIDADO y devuelven strings HTML escapados.
 *
 * El motor no decide contenido: lo único que cambia entre tipos es el rótulo
 * del destinatario y el orden fijo de título → partes → secciones → totales.
 */
import type { Documento } from '../schema';
import { CSS, MARGENES } from './estilos';
import { esc } from './escape';
import { cabecera, partes, pie, secciones, titulo, totales } from './parciales';

/** Payload que espera el Worker de PDF existente (perito.barcelona/pdf). */
export interface PdfPayload {
  html: string;
  headerHtml: string;
  footerHtml: string;
  margin: { top: string; right: string; bottom: string; left: string };
}

function armazon(doc: Documento, rotuloCliente: string): string {
  const cuerpo =
    titulo(doc.tipo, doc.meta) +
    partes(doc.emisor, doc.cliente, rotuloCliente) +
    secciones(doc.secciones) +
    totales(doc.totales);

  return (
    '<!DOCTYPE html>' +
    '<html lang="' + esc(doc.meta.idioma) + '">' +
    '<head>' +
    '<meta charset="utf-8">' +
    '<title>' + esc(doc.meta.numero) + '</title>' +
    '<style>' + CSS + '</style>' +
    '</head>' +
    '<body>' +
    cabecera(doc.emisor) +
    '<main class="hoja">' + cuerpo + '</main>' +
    pie(doc.meta, doc.emisor, doc.pieResumen) +
    '</body>' +
    '</html>'
  );
}

export function renderPresupuesto(doc: Documento): string {
  return armazon(doc, 'Para');
}

export function renderFactura(doc: Documento): string {
  return armazon(doc, 'Facturar a');
}

export function renderInforme(doc: Documento): string {
  return armazon(doc, 'Destinatario');
}

const POR_TIPO = {
  presupuesto: renderPresupuesto,
  factura: renderFactura,
  informe: renderInforme,
} as const;

/** Documento HTML completo, autónomo y server-rendered. Cero JavaScript. */
export function renderHtml(doc: Documento): string {
  return POR_TIPO[doc.tipo](doc);
}

/**
 * Variante para el Worker de PDF: mismo HTML más las plantillas de cabecera y
 * pie de Puppeteer, que son las únicas que saben numerar páginas.
 * La cabecera y el pie fijos del CSS se ocultan para no duplicarlos.
 */
export function renderPdfPayload(doc: Documento): PdfPayload {
  const html = renderHtml(doc).replace(
    '</style>',
    '@media print{.repetida{display:none}.hoja{padding-top:0}}</style>',
  );

  const em = doc.emisor;
  const contacto = [em.telefono, em.email].filter(Boolean).map(esc).join(' &bull; ');
  const identidad = [em.nombre, em.rol].filter(Boolean).map(esc).join(' &mdash; ');

  const headerHtml =
    '<div style="width:100%;padding:10mm 14mm 3mm 14mm;display:flex;justify-content:space-between;' +
    'align-items:flex-end;border-bottom:1.2px solid #26241F;font-family:Archivo,Arial,sans-serif;">' +
    '<div style="font-size:11pt;font-weight:600;color:#26241F;">perito' +
    '<span style="color:#0E6A64;">.</span>' +
    '<span style="font-family:\'JetBrains Mono\',monospace;font-size:8pt;font-weight:400;color:#565248;">barcelona</span>' +
    '</div>' +
    '<div style="text-align:right;font-family:\'JetBrains Mono\',monospace;font-size:6.8pt;color:#8C857A;line-height:1.5;">' +
    (identidad ? identidad + '<br>' : '') +
    contacto +
    '</div>' +
    '</div>';

  const footerHtml =
    '<div style="width:100%;padding:3mm 14mm 6mm 14mm;display:flex;justify-content:space-between;' +
    'align-items:center;border-top:0.6px solid #C9C2B5;font-family:\'JetBrains Mono\',monospace;' +
    'font-size:6.8pt;letter-spacing:.04em;color:#8C857A;">' +
    '<span><span style="color:#0E6A64;">' + esc(doc.meta.numero) + '</span>' +
    (doc.pieResumen ? ' &middot; ' + esc(doc.pieResumen) : '') + '</span>' +
    '<span>P&aacute;g. <span class="pageNumber"></span> de <span class="totalPages"></span></span>' +
    '<span>' + esc(em.web ?? '') + '</span>' +
    '</div>';

  return { html, headerHtml, footerHtml, margin: { ...MARGENES } };
}
