// Listado de posibles respuestas técnicas del servidor que NO deben mostrarse al usuario final
// y función para mapearlas a mensajes amigables.

export const serverErrorPatterns: Array<{ pattern: RegExp; userMessage: string }> = [
  // Errores internos
  { pattern: /internal server error/i, userMessage: "Ocurrió un error inesperado. Intenta nuevamente o contacta a soporte." },
  { pattern: /error interno del servidor/i, userMessage: "Ocurrió un error inesperado. Intenta nuevamente o contacta a soporte." },
  { pattern: /database connection failed|prisma|sql|query/i, userMessage: "Error de conexión. Intenta más tarde." },
  { pattern: /stack trace|cannot read property|unexpected token/i, userMessage: "Ocurrió un error inesperado. Intenta nuevamente." },
  { pattern: /validationerror/i, userMessage: "Algunos datos no son válidos. Revisa el formulario." },
  { pattern: /econnrefused|econnreset|etimedout/i, userMessage: "No se pudo conectar con el servidor. Intenta más tarde." },
  { pattern: /jwt malformed|token expired|invalid token/i, userMessage: "Tu sesión ha expirado o es inválida. Inicia sesión nuevamente." },
  { pattern: /permission denied|forbidden/i, userMessage: "No tienes permisos para realizar esta acción." },
  { pattern: /not found/i, userMessage: "El recurso solicitado no existe." },
  { pattern: /duplicate key|unique constraint/i, userMessage: "Ya existe un registro con ese valor." },
  // Puedes agregar más patrones según tus necesidades
];

export function mapServerErrorToUserMessage(error: unknown): string {
  function hasMessage(e: unknown): e is { message: string } {
    return (
      typeof e === "object" &&
      e !== null &&
      "message" in e &&
      typeof (e as { message: unknown }).message === "string"
    );
  }

  const msg =
    typeof error === "string"
      ? error
      : hasMessage(error)
      ? error.message
      : "Ocurrió un error inesperado. Intenta nuevamente.";

  for (const { pattern, userMessage } of serverErrorPatterns) {
    if (pattern.test(msg)) {
      return userMessage;
    }
  }
  // Si no hay match, retorna el mensaje original si es amigable, o uno genérico
  return msg.length < 100 && !msg.match(/[A-Z]:\\|\/|\.[jt]s|\berror\b/i)
    ? msg
    : "Ocurrió un error inesperado. Intenta nuevamente.";
} 