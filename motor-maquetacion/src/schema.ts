/**
 * Motor de maquetación · esquema del documento
 *
 * FUENTE DE VERDAD del contrato JSON entre el generador de contenido
 * (chat de Claude / CRM Apps Script) y el motor de maquetación.
 *
 * De aquí se derivan:
 *   - los tipos TypeScript (z.infer)
 *   - los mensajes de error 422 del endpoint
 *
 * El espejo manual en Apps Script vive en
 * gestorCRM/apps-script/20_MotorMaquetacion.gs (_docJson). Si cambias algo
 * aquí, actualízalo allí.
 *
 * Regla de oro: sección ausente o vacía = no se renderiza. Sin placeholders.
 */
import { z } from 'zod';

// ── Primitivas ────────────────────────────────────────────────────────────

/** Texto obligatorio: no admite cadena vacía ni solo espacios. */
const textoObligatorio = (campo: string) =>
  z.string({ required_error: `falta ${campo}`, invalid_type_error: `${campo} debe ser texto` })
    .trim()
    .min(1, `${campo} no puede estar vacío`);

/** Texto opcional. La cadena vacía se normaliza a undefined (= no se pinta). */
const textoOpcional = z
  .string({ invalid_type_error: 'debe ser texto' })
  .trim()
  .optional()
  .transform((v) => (v ? v : undefined));

const numero = z.number({ invalid_type_error: 'debe ser un número' }).finite('debe ser un número finito');

const alineacion = z.enum(['izquierda', 'centro', 'derecha']).default('izquierda');

// ── Bloques ───────────────────────────────────────────────────────────────

/** Párrafo de texto corrido. `tono` cambia el peso visual, no el contenido. */
export const BloqueParrafo = z.object({
  tipo: z.literal('parrafo'),
  texto: textoObligatorio('el texto del párrafo'),
  tono: z.enum(['normal', 'destacado', 'nota']).default('normal'),
});

/** Lista de puntos. `marcas` pinta el ✓ del design system. */
export const BloqueLista = z.object({
  tipo: z.literal('lista'),
  estilo: z.enum(['marcas', 'numeros', 'simple']).default('simple'),
  items: z
    .array(
      z.object({
        texto: textoObligatorio('el texto del ítem'),
        detalle: textoOpcional,
      }),
    )
    .default([]),
});

/** Tabla genérica. La de conceptos es una tabla como cualquier otra. */
export const BloqueTabla = z.object({
  tipo: z.literal('tabla'),
  columnas: z
    .array(
      z.object({
        titulo: z.string().trim().default(''),
        alineacion,
        ancho: textoOpcional, // p. ej. "52%"
      }),
    )
    .min(1, 'la tabla necesita al menos una columna'),
  filas: z
    .array(
      z.object({
        celdas: z.array(
          z.object({
            texto: z.string({ invalid_type_error: 'la celda debe ser texto' }).default(''),
            detalle: textoOpcional,
          }),
        ),
      }),
    )
    .default([]),
});

/** Imagen embebida. `src` debe ser data: URI o https: — nada de http ni js. */
export const BloqueImagen = z.object({
  tipo: z.literal('imagen'),
  src: textoObligatorio('el src de la imagen').refine(
    (v) => /^data:image\//i.test(v) || /^https:\/\//i.test(v),
    'src debe ser un data:image/... o una URL https://',
  ),
  alt: z.string().trim().default(''),
  ancho: textoOpcional, // p. ej. "104px"
  pie: textoOpcional,
  alineacion: z.enum(['izquierda', 'centro', 'derecha']).default('centro'),
});

/** Pares clave/valor: la caja de metadatos del documento. */
export const BloqueCampos = z.object({
  tipo: z.literal('campos'),
  items: z
    .array(
      z.object({
        clave: textoObligatorio('la clave del campo'),
        valor: z.string({ invalid_type_error: 'el valor debe ser texto' }).trim().default(''),
        destacado: z.boolean().default(false),
      }),
    )
    .default([]),
});

/** Líneas de firma para la aceptación del presupuesto. */
export const BloqueFirma = z.object({
  tipo: z.literal('firma'),
  etiquetas: z.array(textoObligatorio('la etiqueta de firma')).min(1, 'la firma necesita al menos una etiqueta'),
});

export const Bloque = z.discriminatedUnion('tipo', [
  BloqueParrafo,
  BloqueLista,
  BloqueTabla,
  BloqueImagen,
  BloqueCampos,
  BloqueFirma,
]);

// ── Secciones ─────────────────────────────────────────────────────────────

export const Seccion = z.object({
  id: textoObligatorio('el id de la sección'),
  titulo: textoOpcional,
  /** Variante visual. `caja` pinta el recuadro con filete teal a la izquierda. */
  variante: z.enum(['normal', 'caja', 'discreta']).default('normal'),
  bloques: z.array(Bloque).default([]),
});

// ── Cabeceras del documento ───────────────────────────────────────────────

export const Meta = z.object({
  numero: textoObligatorio('meta.numero'),
  fecha: textoObligatorio('meta.fecha'),
  expediente: textoOpcional,
  idioma: z.enum(['es', 'ca', 'en']).default('es'),
  /** Texto libre bajo el título ("Válido hasta 30/09/2026"). */
  vigencia: textoOpcional,
});

export const Emisor = z.object({
  nombre: textoObligatorio('emisor.nombre'),
  rol: textoOpcional,
  firma: textoOpcional,
  nif: textoOpcional,
  direccion: textoOpcional,
  telefono: textoOpcional,
  email: textoOpcional,
  web: textoOpcional,
});

export const Cliente = z.object({
  nombre: textoObligatorio('cliente.nombre'),
  nif: textoOpcional,
  direccion: textoOpcional,
  telefono: textoOpcional,
  email: textoOpcional,
});

/**
 * Totales YA CALCULADOS aguas arriba. El motor no suma nada: sólo los pinta.
 * `importe` es un número; el formateo a euros lo hace el motor.
 */
export const Totales = z.object({
  moneda: z.string().trim().default('EUR'),
  lineas: z
    .array(
      z.object({
        etiqueta: textoObligatorio('la etiqueta del total'),
        importe: numero,
        /** Fila del total final: filete y tipografía mayor. */
        total: z.boolean().default(false),
        /** Fila con fondo (retenciones). */
        resaltada: z.boolean().default(false),
      }),
    )
    .default([]),
});

// ── Documento ─────────────────────────────────────────────────────────────

export const Documento = z.object({
  tipo: z.enum(['presupuesto', 'factura', 'informe']),
  meta: Meta,
  emisor: Emisor,
  cliente: Cliente,
  secciones: z.array(Seccion).default([]),
  totales: Totales.optional(),
  /** Texto del pie, a la derecha del número de documento. */
  pieResumen: textoOpcional,
});

export const Peticion = z.object({
  documento: Documento,
  salida: z.enum(['html', 'pdf-payload']).default('html'),
});

// ── Tipos derivados ───────────────────────────────────────────────────────

export type Documento = z.infer<typeof Documento>;
export type Peticion = z.infer<typeof Peticion>;
export type Seccion = z.infer<typeof Seccion>;
export type Bloque = z.infer<typeof Bloque>;
export type Meta = z.infer<typeof Meta>;
export type Emisor = z.infer<typeof Emisor>;
export type Cliente = z.infer<typeof Cliente>;
export type Totales = z.infer<typeof Totales>;

// ── Errores legibles ──────────────────────────────────────────────────────

export interface ErrorValidacion {
  campo: string;
  motivo: string;
}

/**
 * Mapa de errores en español. Zod emite sus mensajes por defecto en inglés;
 * este mapa cubre los códigos que puede producir este esquema para que el 422
 * salga legible sin anotar cada campo a mano.
 */
export const mapaErroresEs: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      if (issue.received === 'undefined') return { message: 'campo obligatorio ausente' };
      return { message: `se esperaba ${issue.expected} y llegó ${issue.received}` };
    case z.ZodIssueCode.invalid_enum_value:
      return {
        message: `valor no admitido: "${String(issue.received)}". Válidos: ${issue.options.join(', ')}`,
      };
    case z.ZodIssueCode.invalid_union_discriminator:
      return { message: `tipo de bloque no admitido. Válidos: ${issue.options.join(', ')}` };
    case z.ZodIssueCode.too_small:
      return {
        message:
          issue.type === 'string' ? 'no puede estar vacío' : `necesita al menos ${issue.minimum} elemento(s)`,
      };
    default:
      return { message: ctx.defaultError };
  }
};

/** Valida una petición completa aplicando los mensajes en español. */
export function validarPeticion(bruto: unknown) {
  return Peticion.safeParse(bruto, { errorMap: mapaErroresEs });
}

/** Valida sólo el documento aplicando los mensajes en español. */
export function validarDocumento(bruto: unknown) {
  return Documento.safeParse(bruto, { errorMap: mapaErroresEs });
}

/** Convierte un ZodError en una lista { campo, motivo } apta para un 422. */
export function erroresLegibles(error: z.ZodError): ErrorValidacion[] {
  return error.issues.map((issue) => ({
    campo: issue.path.length ? issue.path.map(String).join('.') : '(raíz)',
    motivo: issue.message,
  }));
}
