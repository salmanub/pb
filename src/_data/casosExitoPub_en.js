// Published EN success cases (estado === "publicado"), sorted desc by date.
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

export default require("./casosExito_en.json")
  .filter((c) => c.estado === "publicado")
  .sort((a, b) => String(b.datePublished).localeCompare(String(a.datePublished)));
