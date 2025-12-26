# DIAGRAMA DE FLUJO - CHATBOT PERITO.BARCELONA

## Flujo de Conversación Completo

```mermaid
graph TD
    A[Usuario llega al sitio] --> B[Widget de chat visible]
    B --> C{Usuario abre chat}
    C -->|Sí| D[Estado: INICIO]
    
    D --> E[Bot: 'Bienvenido a Perito.barcelona<br/>¿Cuál es la naturaleza del problema?']
    E --> F[Mostrar botones nivel 1:<br/>🏗️ Grietas<br/>💧 Humedades<br/>⚖️ Disputa<br/>🔍 Vicios]
    
    F --> G{Usuario selecciona}
    G --> H[Estado: TRIAJE_NIVEL_1]
    
    H --> I{¿Tiene sub-niveles?}
    I -->|Sí| J[Bot: Pregunta específica<br/>del servicio]
    I -->|No| N[Estado: CUALIFICACION_JURIDICA]
    
    J --> K[Mostrar botones nivel 2]
    K --> L{Usuario selecciona}
    L --> M[Estado: TRIAJE_NIVEL_2]
    M --> N
    
    N --> O[Bot: '¿Existe ya una demanda judicial<br/>en curso o es reclamación previa?']
    O --> P[Mostrar botones:<br/>📜 Ya hay demanda<br/>🛡️ Reclamación previa]
    
    P --> Q{Usuario selecciona}
    Q -->|Demanda| R[Marcar: URGENCIA ALTA]
    Q -->|Reclamación| S[Marcar: URGENCIA MEDIA]
    
    R --> T[Estado: CAPTURA_UBICACION]
    S --> T
    
    T --> U[Bot: '¿En qué población está<br/>el inmueble?']
    U --> V{Usuario escribe}
    V --> W[Guardar ubicación]
    W --> X[Estado: CAPTURA_NOMBRE]
    
    X --> Y[Bot: '¿A quién dirijo el<br/>informe preliminar?']
    Y --> Z{Usuario escribe}
    Z --> AA[Guardar nombre]
    AA --> AB[Estado: CAPTURA_TELEFONO]
    
    AB --> AC[Bot: 'Teléfono para<br/>comentar el caso:']
    AC --> AD{Usuario escribe}
    AD --> AE[Guardar teléfono]
    
    AE --> AF[Compilar datos del lead]
    AF --> AG[Enviar email vía MailChannels]
    AG --> AH{Email enviado?}
    
    AH -->|Sí| AI[Bot: 'Gracias. Un técnico<br/>te contactará en 24h']
    AH -->|No| AJ[Log error + Retry]
    AJ --> AG
    
    AI --> AK[Estado: FINALIZADO]
    AK --> AL[Limpiar sesión]
    AL --> AM[Fin]
```

## Arquitectura Técnica

```mermaid
graph LR
    A[Usuario en<br/>perito.barcelona] --> B[Widget HTML/JS]
    B --> C{Cloudflare Worker}
    
    C --> D[Google Sheets API]
    C --> E[OpenAI API]
    C --> F[MailChannels API]
    
    D --> G[Servicios_Periciales]
    D --> H[Configuracion]
    
    E --> I[GPT-4 Turbo]
    
    F --> J[Email a<br/>info@perito.barcelona]
    
    C --> K[Session Store<br/>In-Memory/KV]
    
    style C fill:#f9a825
    style G fill:#4caf50
    style I fill:#2196f3
    style J fill:#e91e63
```

## Estados de la Máquina de Estados

```mermaid
stateDiagram-v2
    [*] --> INICIO
    INICIO --> TRIAJE_NIVEL_1: Mostrar categorías
    
    TRIAJE_NIVEL_1 --> TRIAJE_NIVEL_2: Servicio con hijos
    TRIAJE_NIVEL_1 --> CUALIFICACION_JURIDICA: Servicio sin hijos
    
    TRIAJE_NIVEL_2 --> CUALIFICACION_JURIDICA: Sub-servicio seleccionado
    
    CUALIFICACION_JURIDICA --> CAPTURA_UBICACION: Tipo legal capturado
    
    CAPTURA_UBICACION --> CAPTURA_NOMBRE: Ubicación guardada
    
    CAPTURA_NOMBRE --> CAPTURA_TELEFONO: Nombre guardado
    
    CAPTURA_TELEFONO --> FINALIZADO: Teléfono guardado + Email enviado
    
    FINALIZADO --> [*]
```

## Flujo de Datos (Lead)

```mermaid
sequenceDiagram
    participant U as Usuario
    participant W as Widget
    participant CF as Cloudflare Worker
    participant GS as Google Sheets
    participant AI as OpenAI
    participant MC as MailChannels
    
    U->>W: Abre chat
    W->>CF: POST /api/chat {sessionId, mensaje: 'inicio'}
    CF->>GS: GET Servicios nivel 1
    GS-->>CF: Array de servicios
    CF-->>W: {texto, botones: [...]}
    W-->>U: Muestra opciones
    
    U->>W: Click "Grietas"
    W->>CF: POST {sessionId, mensaje: 'grietas-estructura'}
    CF->>GS: GET Servicios nivel 2 con padre='grietas-estructura'
    GS-->>CF: Array de sub-servicios
    CF-->>W: {texto, botones: [...]}
    
    Note over U,W: Usuario navega hasta servicio final
    
    U->>W: Selecciona tipo legal
    W->>CF: POST {sessionId, mensaje: 'demanda'}
    CF-->>W: "¿En qué población...?"
    
    U->>W: "Barcelona"
    W->>CF: POST {sessionId, mensaje: 'Barcelona'}
    CF-->>W: "¿A quién dirijo...?"
    
    U->>W: "Juan Pérez"
    W->>CF: POST {sessionId, mensaje: 'Juan Pérez'}
    CF-->>W: "Teléfono...?"
    
    U->>W: "600123456"
    W->>CF: POST {sessionId, mensaje: '600123456'}
    
    CF->>MC: POST Email con lead completo
    MC-->>CF: 200 OK
    
    CF-->>W: "Gracias, un técnico te contactará..."
    W-->>U: Mensaje final
```

## Estructura de Datos (Google Sheets)

```mermaid
erDiagram
    SERVICIOS_PERICIALES {
        string slug PK
        string categoria
        string nombre_servicio
        string icono
        int nivel
        string padre_slug FK
        string pregunta_filtro
        string contexto_venta
        int orden
        boolean activo
    }
    
    CONFIGURACION {
        string clave PK
        string valor
        string descripcion
    }
    
    SESSION {
        string sessionId PK
        string estado
        json historial
        json datos
        datetime lastActivity
    }
    
    LEAD {
        string sessionId FK
        string servicio_slug FK
        string categoria
        string tipo_legal
        string urgencia
        string ubicacion
        string nombre
        string telefono
        datetime timestamp
    }
    
    SERVICIOS_PERICIALES ||--o{ SERVICIOS_PERICIALES : "tiene hijos"
    SESSION ||--|| LEAD : "genera"
    SERVICIOS_PERICIALES ||--o{ LEAD : "relacionado con"
```

---

## Cómo leer estos diagramas

### 1. Flujo de Conversación
- Muestra todos los pasos que el usuario realiza
- Decisiones clave resaltadas en rombos
- Estados del chatbot en rectángulos

### 2. Arquitectura Técnica
- Componentes del sistema y sus conexiones
- APIs externas utilizadas
- Flujo de datos

### 3. Máquina de Estados
- Estados posibles del chatbot
- Transiciones entre estados
- Condiciones de cambio

### 4. Flujo de Datos (Secuencia)
- Interacción temporal entre componentes
- Orden de las llamadas API
- Formato de mensajes

### 5. Estructura de Datos
- Relaciones entre entidades
- Campos clave de cada tabla/entidad
- Claves primarias y foráneas

---

## Visualización Online

Para ver estos diagramas renderizados:

1. Copiar el código Mermaid
2. Pegar en: https://mermaid.live/
3. O usar extensión Mermaid en VS Code

---

**Nota**: GitHub y muchos editores Markdown renderizan automáticamente diagramas Mermaid.
