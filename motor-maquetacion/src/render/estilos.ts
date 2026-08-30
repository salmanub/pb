/**
 * Design system «Jornada» — hoja de estilo única del motor.
 *
 * Tipografía: Lora (texto), Archivo (títulos), JetBrains Mono (datos).
 * Papel #F2EFE9 · tinta #26241F · teal #0E6A64 · ámbar #8A5A00.
 * Sin border-radius en ningún elemento.
 *
 * Nota: las tres familias no están autoalojadas en perito.barcelona (allí sólo
 * hay Spectral / IBM Plex). Se cargan de Google Fonts, que el navegador del
 * Worker de Browser Rendering sí puede alcanzar, con pila de respaldo local.
 */

export const FUENTES_URL =
  'https://fonts.googleapis.com/css2' +
  '?family=Archivo:wght@500;600;700' +
  '&family=JetBrains+Mono:wght@400;500;600' +
  '&family=Lora:ital,wght@0,400;0,500;0,600;1,400' +
  '&display=swap';

/** Alto reservado en el margen de página para cabecera y pie repetidos. */
export const MARGENES = {
  top: '26mm',
  right: '0mm',
  bottom: '20mm',
  left: '0mm',
} as const;

export const CSS = `
@import url("${FUENTES_URL}");

:root{
  --papel:#F2EFE9;
  --papel-caja:#E8E3DA;
  --papel-banda:#DFD9CE;
  --tinta:#26241F;
  --tinta-suave:#565248;
  --tinta-tenue:#8C857A;
  --teal:#0E6A64;
  --teal-oscuro:#0A4F4A;
  --ambar:#8A5A00;
  --filete:#C9C2B5;
  --serif:"Lora",Georgia,"Times New Roman",serif;
  --titulo:"Archivo","Helvetica Neue",Arial,sans-serif;
  --mono:"JetBrains Mono","SFMono-Regular",Consolas,"Courier New",monospace;
}

*{box-sizing:border-box;border-radius:0}

@page{
  size:A4;
  margin:${MARGENES.top} ${MARGENES.right} ${MARGENES.bottom} ${MARGENES.left};
}

html,body{
  margin:0;
  padding:0;
  background:var(--papel);
  color:var(--tinta);
  font-family:var(--serif);
  font-size:9.5pt;
  line-height:1.6;
  -webkit-print-color-adjust:exact;
  print-color-adjust:exact;
}

.hoja{padding:0 14mm}

/* ── Cabecera y pie repetidos ───────────────────────────────────────────── */
/* En impresión van fijos en el margen de página, así se repiten en todas.
   En pantalla quedan como cabecera y pie normales del documento. */

.repetida{
  font-family:var(--mono);
  color:var(--tinta-tenue);
}

.cabecera{
  display:flex;
  justify-content:space-between;
  align-items:flex-end;
  padding:0 14mm 3mm 14mm;
  border-bottom:1.2px solid var(--tinta);
  margin-bottom:8mm;
}
.cabecera .marca{
  font-family:var(--titulo);
  font-size:12pt;
  font-weight:600;
  letter-spacing:-.01em;
  color:var(--tinta);
}
.cabecera .marca .punto{color:var(--teal)}
.cabecera .marca .dominio{
  font-family:var(--mono);
  font-size:8pt;
  font-weight:400;
  color:var(--tinta-suave);
}
.cabecera .contacto{
  text-align:right;
  font-size:7pt;
  line-height:1.5;
  letter-spacing:.02em;
}

.pie{
  display:flex;
  justify-content:space-between;
  gap:12px;
  padding:3mm 14mm 0 14mm;
  border-top:.6px solid var(--filete);
  font-size:6.8pt;
  letter-spacing:.04em;
  margin-top:10mm;
}
.pie .doc{color:var(--teal)}

@media print{
  .cabecera{
    position:fixed;
    top:-${MARGENES.top};
    left:0;
    right:0;
    height:${MARGENES.top};
    padding-top:12mm;
    background:var(--papel);
    margin-bottom:0;
  }
  .pie{
    position:fixed;
    bottom:-${MARGENES.bottom};
    left:0;
    right:0;
    height:${MARGENES.bottom};
    padding-top:4mm;
    background:var(--papel);
    margin-top:0;
  }
  .hoja{padding-top:0}
}

/* ── Título del documento ───────────────────────────────────────────────── */

.titulo{
  display:flex;
  align-items:baseline;
  justify-content:space-between;
  gap:16px;
}
.titulo h1{
  margin:0;
  font-family:var(--titulo);
  font-size:26pt;
  font-weight:600;
  letter-spacing:-.02em;
  color:var(--teal);
}
.titulo .num{
  font-family:var(--mono);
  font-size:10pt;
  letter-spacing:.04em;
  color:var(--tinta-suave);
  white-space:nowrap;
}
.vigencia{
  margin-top:2px;
  font-family:var(--mono);
  font-size:8pt;
  letter-spacing:.04em;
  color:var(--ambar);
}

/* ── Partes (emisor / cliente) ──────────────────────────────────────────── */

.partes{
  margin-top:12mm;
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:22px;
  align-items:start;
}
.rotulo{
  font-family:var(--mono);
  font-size:6.8pt;
  font-weight:600;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:var(--tinta-tenue);
}
.parte .nombre{
  font-family:var(--titulo);
  font-size:12pt;
  font-weight:600;
  color:var(--tinta);
  margin-top:5px;
}
.parte .rol{
  font-style:italic;
  font-size:9pt;
  color:var(--tinta-suave);
}
.parte .datos{
  font-family:var(--mono);
  font-size:8pt;
  line-height:1.7;
  color:var(--tinta-suave);
  margin-top:6px;
}
.parte.caja{
  background:var(--papel-caja);
  border-left:3px solid var(--teal);
  padding:12px 15px;
}

/* ── Secciones y bloques ────────────────────────────────────────────────── */

.seccion{margin-top:8mm;page-break-inside:avoid}
.seccion > h2{
  margin:0 0 5px 0;
  font-family:var(--mono);
  font-size:6.8pt;
  font-weight:600;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:var(--teal);
}
.seccion.caja{
  background:var(--papel-caja);
  border-left:3px solid var(--teal);
  padding:13px 16px;
}
.seccion.discreta{
  padding-top:10px;
  border-top:.6px solid var(--filete);
  font-size:8.5pt;
  color:var(--tinta-suave);
}

p.parrafo{margin:0 0 6px 0}
p.parrafo:last-child{margin-bottom:0}
p.parrafo.destacado{font-weight:600;color:var(--tinta)}
p.parrafo.nota{font-size:8.5pt;color:var(--tinta-suave)}

ul.lista,ol.lista{margin:0;padding-left:1.1em}
ul.lista.marcas{list-style:none;padding-left:0}
ul.lista.marcas > li{padding-left:1.2em;position:relative;font-weight:600}
ul.lista.marcas > li::before{
  content:"\\2713";
  position:absolute;
  left:0;
  color:var(--teal);
  font-weight:700;
}
.lista > li{margin-bottom:3px}
.lista .detalle{
  display:block;
  font-size:8.5pt;
  font-weight:400;
  color:var(--tinta-suave);
  line-height:1.45;
}

table.tabla{
  width:100%;
  border-collapse:collapse;
  margin:0;
}
table.tabla thead th{
  background:var(--papel-banda);
  padding:8px 10px;
  font-family:var(--mono);
  font-size:6.8pt;
  font-weight:600;
  letter-spacing:.1em;
  text-transform:uppercase;
  color:var(--tinta);
  text-align:left;
}
table.tabla tbody td{
  padding:10px;
  font-size:9pt;
  line-height:1.45;
  vertical-align:top;
  border-bottom:.6px solid var(--filete);
}
table.tabla .principal{font-weight:600;color:var(--tinta)}
table.tabla .detalle{
  display:block;
  font-size:8.3pt;
  color:var(--tinta-suave);
  margin-top:3px;
  line-height:1.4;
}
.al-derecha{text-align:right;font-family:var(--mono);font-variant-numeric:tabular-nums;white-space:nowrap}
.al-centro{text-align:center;font-family:var(--mono)}
/* La regla de thead th fija text-align:left, así que las columnas alineadas
   necesitan la misma especificidad para ganarle. */
table.tabla thead th.al-derecha{text-align:right}
table.tabla thead th.al-centro{text-align:center}
table.tabla thead{display:table-header-group}
table.tabla tr{page-break-inside:avoid}

.campos{
  display:grid;
  grid-template-columns:auto 1fr;
  gap:2px 14px;
  font-family:var(--mono);
  font-size:8.2pt;
  line-height:1.55;
}
.campos .k{
  color:var(--tinta-tenue);
  text-transform:uppercase;
  letter-spacing:.06em;
}
.campos .v{text-align:right;color:var(--tinta);font-weight:500}
.campos .v.destacado{color:var(--ambar);font-weight:600}

figure.imagen{margin:6px 0 0 0}
figure.imagen.al-centro{text-align:center}
figure.imagen.al-derecha{text-align:right}
figure.imagen img{max-width:100%}
figure.imagen figcaption{
  font-size:7.5pt;
  color:var(--tinta-suave);
  margin-top:5px;
  line-height:1.4;
}

.firma{
  margin-top:24px;
  display:flex;
  gap:40px;
}
.firma .linea{
  flex:1;
  border-top:.8px solid var(--tinta-tenue);
  padding-top:5px;
  font-family:var(--mono);
  font-size:7.2pt;
  text-transform:uppercase;
  letter-spacing:.06em;
  color:var(--tinta-suave);
}

/* ── Totales ────────────────────────────────────────────────────────────── */

.totales-wrap{
  margin-top:8px;
  display:flex;
  justify-content:flex-end;
  page-break-inside:avoid;
}
table.totales{
  width:62%;
  border-collapse:collapse;
  font-family:var(--mono);
  font-variant-numeric:tabular-nums;
  font-size:9pt;
}
table.totales td{padding:5px 10px}
table.totales td.k{color:var(--tinta-suave)}
table.totales td.v{text-align:right;color:var(--tinta)}
table.totales tr.resaltada td{background:var(--papel-caja)}
table.totales tr.total td{
  font-size:11.5pt;
  font-weight:700;
  color:var(--teal-oscuro);
  border-top:1.2px solid var(--teal);
  padding-top:8px;
}
`;
