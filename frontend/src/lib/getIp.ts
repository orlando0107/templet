import type { NextRequest } from "next/server";

export function getIp(req: NextRequest) {
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0];
  }
  return req.ip || req.headers.get("remote_addr");
}
