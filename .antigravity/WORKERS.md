# WORKERS.md — Reglas compartidas para todos los Workers
# perito.barcelona | Antigravity v2

## ANTES DE EMPEZAR TU TURNO
Leer siempre:
1. context.original (el prompt original del usuario)
2. Tu requisito asignado (scope concreto, no más)
3. AGENTES.md del proyecto (reglas de arquitectura)
4. Los ficheros que vas a tocar (estado actual)

## ANTI-PREMATURE-COMPLETION — Regla más importante

Un worker NUNCA termina su turno si:
- Hay TODOs, placeholders o "[pendiente]" en el output
- El fichero no compila o tiene errores de sintaxis
- npm run build falla (ejecutarlo antes de terminar)
- Has tocado menos ficheros de los que requería el requisito
- Has cambiado el scope sin notificar al Manager

## PROTOCOLO DE ENTREGA

Antes de pasar el control al siguiente agente, SIEMPRE:

1. Ejecutar: npm run build
   Si falla → corregir antes de entregar. NUNCA entregar con build roto.

2. Ejecutar grep:
   grep -r "TODO\|FIXME\|placeholder\|\[pendiente\]" src/
   Si aparece → completar antes de entregar.

3. Reportar al Manager:
```
WORKER_DONE:
  worker: [nombre]
  requisito: [nº y texto]
  ficheros_modificados:
    - [ruta]: [descripción del cambio]
  build: PASS
  pendientes: ninguno
```

## CUANDO EL REQUISITO ES AMBIGUO

NUNCA inventar. Reportar:
```
CLARIFICATION_NEEDED:
  worker: [nombre]
  pregunta: [pregunta concreta y específica]
  opciones: [A, B, C si aplica]
```

## SCOPE LOCK
NUNCA modificar ficheros fuera de tu scope asignado.
NUNCA añadir features no pedidas.
NUNCA eliminar código existente salvo que esté en el requisito.

## REGLAS DE ARQUITECTURA (de AGENTES.md)
NUNCA texto hardcoded en .njk
NUNCA HTML/CSS/JS en ficheros .md
NUNCA crear página en un idioma sin sus 3 hermanas (es/ca/fr/en)
NUNCA JSON-LD en múltiples bloques — siempre un único @graph
NUNCA border-radius — diseño Peritia v4: ángulos rectos
NUNCA colores fuera del design system
