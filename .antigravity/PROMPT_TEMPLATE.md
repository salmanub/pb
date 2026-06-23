# TASK.md — Plantilla de prompt para Antigravity
# Copiar para cada nueva tarea. Rellenar todos los campos.

---
task_id: TASK-[número]
fecha: [YYYY-MM-DD]
prioridad: alta|media|baja
---

## OBJETIVO

[Una frase: QUÉ debe existir al terminar, no lo que hay que hacer.]

## CONTEXTO

- Estado actual: [qué ya existe, qué está roto]
- NO tocar: [ficheros o secciones que no deben cambiar]
- Ficheros de referencia: AGENTES.md, [otros]

## REQUISITOS

REQ-01: [acción concreta] en [fichero concreto]
  Criterio: [cómo verificar objetivamente que está hecho]

REQ-02: [acción concreta] en [fichero concreto]
  Criterio: [cómo verificar objetivamente que está hecho]

## EXCLUSIONES EXPLÍCITAS

- NO modificar [fichero X]
- NO cambiar [comportamiento Y]
- NO añadir [feature Z] aunque parezca relacionada

## CRITERIO DE DONE

[ ] npm run build pasa sin errores
[ ] REQ-01 verificado: [cómo]
[ ] REQ-02 verificado: [cómo]
[ ] 4 idiomas presentes (es/ca/fr/en)
[ ] Sin TODOs ni placeholders
[ ] JSON-LD: un único @graph por página
[ ] Sin texto hardcoded en .njk

## NOTAS PARA EL AGENTE

[Errores de tareas anteriores a evitar.]
[Decisiones de diseño ya tomadas.]
