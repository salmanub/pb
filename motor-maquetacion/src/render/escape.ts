/**
 * Escapado propio. Sin librerías de templating: todo lo que entra en el HTML
 * pasa por aquí. No hay ninguna vía por la que el JSON pueda inyectar marcado.
 */

/** Escapa texto para nodos de contenido y para valores de atributo. */
export function esc(valor: unknown): string {
  if (valor === null || valor === undefined) return '';
  return String(valor)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Escapa una URL destinada a src/href. Sólo deja pasar data:image/... y https://.
 * Cualquier otra cosa (javascript:, data:text/html, http:) devuelve cadena vacía,
 * de modo que el atributo se omite en vez de renderizar algo peligroso.
 */
export function escUrl(valor: unknown): string {
  const s = String(valor ?? '').trim();
  if (!/^data:image\/[a-z0-9.+-]+[;,]/i.test(s) && !/^https:\/\//i.test(s)) return '';
  return esc(s);
}

/** Convierte saltos de línea en <br>, con el texto ya escapado. */
export function escMultilinea(valor: unknown): string {
  return esc(valor).replace(/\r?\n/g, '<br>');
}

/**
 * Formatea un importe en euros con el formato español: 1.234,56 €.
 * Mismo formato que _eur() en Apps Script (05_Aceptacion.gs), para que los
 * importes de las tablas y los de los totales se vean idénticos. El espacio
 * previo al símbolo es duro (U+00A0) para que el importe no parta de línea.
 */
export function eur(n: number, moneda = 'EUR'): string {
  const negativo = n < 0;
  const [entera, decimal] = Math.abs(n).toFixed(2).split('.');
  const conMiles = entera.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const simbolo = ' ' + (moneda === 'EUR' ? '€' : moneda);
  return (negativo ? '−' : '') + conMiles + ',' + decimal + simbolo;
}
