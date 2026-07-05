# Pipeline de leads → CRM (Sheets directo)

Antes había desconexión entre Make y el CRM (gestorCRM):
- Make escribía filas directas en Google Sheets con **columnas descuadradas** respecto al esquema del CRM.
- Make usaba **Holded**, que el CRM ya retiró.
- Tres claves de routing distintas (`perfil` / `origen` / `marca`) sin alinear.

## Diseño nuevo

```
Formulario web → /api/contacto (Cloudflare Function) → Webhook Make
   → Router por `origen` → addRow a la pestaña de marca del CRM (columnas alineadas)
   → [Apps Script, trigger cada 5 min] completa la fila: ID, marca, fiscalidad, idioma, acuse
```

Make **solo** escribe los campos básicos del lead en las columnas correctas y deja la
**columna A (ID) vacía**. El CRM detecta las filas sin ID con un **trigger por tiempo**
(los `addRow` por API **no** disparan `onEdit`/`onChange`) y las completa:
ID correlativo (`EXP-26-NNN`…), marca, fases/contrato/entregable, fiscalidad, dirección
normalizada, idioma, y envía el acuse al cliente + aviso interno.

Código: `apps-script/21_LeadsMakeSheet.gs` (`procesarLeadsPendientes`, `_completarFilaLead`,
`instalarTriggerLeadsMake`). Menú del CRM → 🛠️ Sistema → «Instalar auto-completado de leads»
y «Procesar leads nuevos ahora».

## Escenario Make: `blueprint-crm-sheets.json`

Sustituye a `new-blueprint.json`. Flujo: Webhook → Router por `origen` → `addRow` a la
pestaña de marca → responde 200. **Sin Holded, sin Sheets duplicados.**

Mapa de columnas que escribe Make (índice 0-based → columna del CRM):
`1`=Fecha, `3`=Estado("Lead"), `4`=Cliente, `5`=Email, `6`=Teléfono, `7`=Descripción,
`8`=Dirección visita, `16`=Tipus client, `17`=NIF, `26`=Población fiscal, `35`=Población visita.
La col `0` (ID) se deja vacía a propósito.

## Pasos manuales (una vez)

1. **Consigue el ID del spreadsheet del CRM Maestro** (el que contiene las pestañas
   `Perito_BCN`, `Refuerzo_Fibra`, `Urbenis`, `NaveFit`). En el blueprint viejo la ruta
   `perito-encargos` usaba `1sYIzvDpNthNSIzB8ejdTNhSIJmlTMMeBp50m9QHlMyg` — **confirma** que
   es el CRM Maestro; si lo es, úsalo en las 4 rutas.
2. En Make: **importa** `blueprint-crm-sheets.json` y reemplaza `TU_CRM_SPREADSHEET_ID` por
   ese ID en los 4 módulos `addRow`. Revisa la conexión de Google Sheets.
3. En el CRM (Apps Script): `clasp push` y menú → 🛠️ Sistema → **«Instalar auto-completado
   de leads (Make)»** (crea el trigger cada 5 min).
4. Activa el escenario de Make y haz una prueba con el formulario.

> **Nota sobre los dos webhooks:** `functions/api/contacto.js` enruta por `perfil` a
> `MAKE_WEBHOOK_PARTICULAR` o `MAKE_WEBHOOK_PROFESIONAL`. Ambos deben apuntar al **mismo**
> escenario (el router reparte por `origen`), o duplica el escenario por perfil.
> El modal `intake.js` ya hace `fetch` POST a `/api/contacto` (con `mailto` solo como fallback).

## Mapa origen → pestaña de marca

| origen | pestaña |
|---|---|
| perito, perito-express, perito-encargos, perito.barcelona, humedades, pavimento (y cualquier otro) | `Perito_BCN` |
| refuerzofibra | `Refuerzo_Fibra` |
| urbenis | `Urbenis` |
| navefit | `NaveFit` |

(La ruta perito es el *catch-all*: recibe todo lo que no sea refuerzo/urbenis/navefit.)
