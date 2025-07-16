import type { NextRequest } from "next/server";

export function getIp(req: NextRequest) {
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  // req.ip does not exist on NextRequest, so fallback to remote_addr header
  return req.headers.get("remote_addr") || null;
}