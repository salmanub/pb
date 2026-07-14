// Casos de éxito ES publicados (estado === "publicado"), orden desc por fecha.
// Fuente única: casosExito.json. Los borradores (p. ej. expedientes no cerrados)
// quedan fuera del listado con solo cambiar su "estado".
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

export default require("./casosExito.json")
  .filter((c) => c.estado === "publicado")
  .sort((a, b) => String(b.datePublished).localeCompare(String(a.datePublished)));
