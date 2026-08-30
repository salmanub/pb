/*
 * OBSOLETO — no se carga desde ninguna página.
 *
 * El formulario de alta de perito colaborador se reescribió en ZERO-JS
 * (AGENTES §5.6): pasos con :target + validación HTML5 nativa + POST nativo.
 * La lógica vive ahora en src/_includes/partials/form-colaborador.njk y el
 * redirect posterior al envío lo hace functions/api/contacto.js con un 303.
 *
 * Este fichero queda vacío a propósito para no engordar el build. PENDIENTE:
 * borrarlo del repo (`git rm src/assets/js/intake-colaborador.js`).
 */
