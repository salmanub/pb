/**
 * POST /motor/render — Cloudflare Pages Function (perito.barcelona)
 *
 * Punto de entrada del motor de maquetación. Toda la lógica vive en
 * motor-maquetacion/src, que además es lo que ejercitan los tests de vitest.
 *
 * Variables de entorno (Cloudflare Pages → Settings → Environment variables):
 *   RENDER_TOKEN — mismo secreto que ya usa el Worker de PDF (cabecera x-auth-token)
 */
import { manejarPeticion, type Entorno } from '../../motor-maquetacion/src/index';

export const onRequest: PagesFunction<Entorno> = async (context) =>
  manejarPeticion(context.request, context.env);
