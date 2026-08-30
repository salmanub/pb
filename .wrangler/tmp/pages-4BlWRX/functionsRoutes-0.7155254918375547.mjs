import { onRequestOptions as __api_contacto_js_onRequestOptions } from "C:\\Users\\avila\\dev\\pb\\functions\\api\\contacto.js"
import { onRequestPost as __api_contacto_js_onRequestPost } from "C:\\Users\\avila\\dev\\pb\\functions\\api\\contacto.js"
import { onRequestPost as __api_create_payment_js_onRequestPost } from "C:\\Users\\avila\\dev\\pb\\functions\\api\\create-payment.js"
import { onRequestOptions as __api_form_assist_js_onRequestOptions } from "C:\\Users\\avila\\dev\\pb\\functions\\api\\form-assist.js"
import { onRequestPost as __api_form_assist_js_onRequestPost } from "C:\\Users\\avila\\dev\\pb\\functions\\api\\form-assist.js"
import { onRequestPost as __api_stripe_webhook_js_onRequestPost } from "C:\\Users\\avila\\dev\\pb\\functions\\api\\stripe-webhook.js"
import { onRequestGet as __g_collect_js_onRequestGet } from "C:\\Users\\avila\\dev\\pb\\functions\\g\\collect.js"
import { onRequestPost as __g_collect_js_onRequestPost } from "C:\\Users\\avila\\dev\\pb\\functions\\g\\collect.js"
import { onRequestGet as __gtag_js_js_onRequestGet } from "C:\\Users\\avila\\dev\\pb\\functions\\gtag\\js.js"
import { onRequest as __motor_render_ts_onRequest } from "C:\\Users\\avila\\dev\\pb\\functions\\motor\\render.ts"
import { onRequest as ___middleware_js_onRequest } from "C:\\Users\\avila\\dev\\pb\\functions\\_middleware.js"

export const routes = [
    {
      routePath: "/api/contacto",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_contacto_js_onRequestOptions],
    },
  {
      routePath: "/api/contacto",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_contacto_js_onRequestPost],
    },
  {
      routePath: "/api/create-payment",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_create_payment_js_onRequestPost],
    },
  {
      routePath: "/api/form-assist",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_form_assist_js_onRequestOptions],
    },
  {
      routePath: "/api/form-assist",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_form_assist_js_onRequestPost],
    },
  {
      routePath: "/api/stripe-webhook",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_stripe_webhook_js_onRequestPost],
    },
  {
      routePath: "/g/collect",
      mountPath: "/g",
      method: "GET",
      middlewares: [],
      modules: [__g_collect_js_onRequestGet],
    },
  {
      routePath: "/g/collect",
      mountPath: "/g",
      method: "POST",
      middlewares: [],
      modules: [__g_collect_js_onRequestPost],
    },
  {
      routePath: "/gtag/js",
      mountPath: "/gtag",
      method: "GET",
      middlewares: [],
      modules: [__gtag_js_js_onRequestGet],
    },
  {
      routePath: "/motor/render",
      mountPath: "/motor",
      method: "",
      middlewares: [],
      modules: [__motor_render_ts_onRequest],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "",
      middlewares: [___middleware_js_onRequest],
      modules: [],
    },
  ]