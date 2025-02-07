import type { NextRequest } from "next/server";
import { UAParser } from "ua-parser-js";

export function getDeviceInfo(req: NextRequest) {
  const userAgent = req.headers.get("user-agent");

  // Si no hay user-agent, retornamos un objeto con valores predeterminados
  if (!userAgent) {
    return { device: "Desconocido", os: "Desconocido", browser: "Desconocido" };
  }

  // Si hay user-agent, usamos ua-parser-js para obtener la información del dispositivo
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  return {
    device: result.device.model || "Desconocido",
    os: result.os.name || "Desconocido",
    browser: result.browser.name || "Desconocido",
  };
}
