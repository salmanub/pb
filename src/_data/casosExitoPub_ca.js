// Casos d'èxit CA publicats (estado === "publicado"), ordre desc per data.
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

export default require("./casosExito_ca.json")
  .filter((c) => c.estado === "publicado")
  .sort((a, b) => String(b.datePublished).localeCompare(String(a.datePublished)));
