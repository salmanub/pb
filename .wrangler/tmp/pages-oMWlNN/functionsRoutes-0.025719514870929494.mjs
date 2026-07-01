import { onRequestOptions as __api_contacto_js_onRequestOptions } from "C:\\Users\\avila\\perito11ty\\functions\\api\\contacto.js"
import { onRequestPost as __api_contacto_js_onRequestPost } from "C:\\Users\\avila\\perito11ty\\functions\\api\\contacto.js"
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
      routePath: "/",
      mountPath: "/",
      method: "",
      middlewares: [___middleware_js_onRequest],
      modules: [],
    },
  ]