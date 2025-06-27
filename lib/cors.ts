// lib/cors.ts
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://myflightteam.com", // production
  "https://leading-edge-drone-services.vercel.app",
];

export function handlePreflight(request: NextRequest) {
  const origin = request.headers.get("origin") ?? "*";
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin)
        ? origin
        : "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
}

export function withCORS(request: NextRequest, response: NextResponse) {
  const origin = request.headers.get("origin") ?? "*";
  response.headers.set(
    "Access-Control-Allow-Origin",
    ALLOWED_ORIGINS.includes(origin) ? origin : "*"
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization"
  );
  return response;
}
