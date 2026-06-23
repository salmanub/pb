# UI Kit — perito.barcelona (versión definitiva, mejorada)

Incorpora la propuesta que el cliente estaba valorando (*"Peritia v5"* — teal
editorial, Playfair Display + DM Sans + JetBrains Mono, mucho espacio blanco) y
la **maquinaria de captación del Expediente** (caja de cualificación sticky,
chips de normativa, metadatos `EXP·NN`), **rehecha y mejorada sobre el sistema
de diseño**.

## Run it
Abre `index.html`. Navegación completa: home, *Perito Construcción* (particulares),
hub de informes, 8 páginas de servicio (genéricas desde datos), casos, B2B,
honorarios, despacho, contacto. El botón *Consultar caso* abre el intake guiado.

## Archivos
| Archivo | Rol |
|---|---|
| `index.html` | Tema (re-skin teal/ámbar + fuentes sobre los tokens) + router + modal `StepForm` |
| `shared.jsx` | Datos (SVCS, CASOS, TESTI, PROTO, INTAKE) + Nav, Footer, Ticker, Band, Qual, PHero, filas de servicio, Icon |
| `pages.jsx` | Home, Construcción, Informes, Svc, Casos, Abogados, Honorarios, Despacho, Contacto |

## Qué mejoré sobre el borrador del cliente
1. **Montado sobre el sistema, no un one-off.** El tema reescribe sólo los
   tokens base (`--oxide-*` → teal, fuentes → Playfair/DM/JetBrains) y los
   componentes del sistema (`Button`, `Tag`, `Seal`, `Stat`, `Accordion`,
   `StepForm`) heredan el tema automáticamente. Cambiar la paleta es una línea.
2. **`StepForm` del sistema en lugar del Typeform a medida** — accesible (Esc,
   foco, validación, barra `§ NN/NN`), mismo contenido de las 5 preguntas.
3. **Sello de registro** (`Seal`) como marca de credibilidad en los page-hero
   institucionales; el borrador no tenía marca gráfica.
4. **Ámbar como segunda voz deliberada** para la ruta del particular/urgencia
   (hero pill, landing *Construcción*, bandas CTA), dejando el teal como voz
   institucional → afila la estrategia de dos audiencias del brief.
5. **Iconografía Lucide** en lugar de flechas unicode; **estados de foco**
   accesibles; ritmo de espaciado y radios por tokens; nav móvil con menú.

## Pendiente / notas
- Sin fotografía inventada. Faltan retrato de Albert e imágenes de inspección.
- Direcciones, teléfono y datos colegiales provienen del borrador del cliente:
  verificar antes de producción.
