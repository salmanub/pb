import { onRequestOptions as __api_contacto_js_onRequestOptions } from "C:\\Users\\avila\\perito11ty\\functions\\api\\contacto.js"
import { onRequestPost as __api_contacto_js_onRequestPost } from "C:\\Users\\avila\\perito11ty\\functions\\api\\contacto.js"
import { onRequestGet as __g_collect_js_onRequestGet } from "C:\\Users\\avila\\perito11ty\\functions\\g\\collect.js"
import { onRequestPost as __g_collect_js_onRequestPost } from "C:\\Users\\avila\\perito11ty\\functions\\g\\collect.js"
import { onRequestGet as __gtag_js_js_onRequestGet } from "C:\\Users\\avila\\perito11ty\\functions\\gtag\\js.js"
import { onRequest as ___middleware_js_onRequest } from "C:\\Users\\avila\\perito11ty\\functions\\_middleware.js"

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
      routePath: "/",
      mountPath: "/",
      method: "",
      middlewares: [___middleware_js_onRequest],
      modules: [],
    },
  ]