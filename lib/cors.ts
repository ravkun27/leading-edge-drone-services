// lib/cors.ts
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "http://localhost:3000", // dev
  "https://myflightteam.com", // production
];

const DEFAULT_HEADERS = {
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function withCORS(req: NextRequest, res: NextResponse): NextResponse {
  const origin = req.headers.get("origin") || "";

  const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin);

  const headers = {
    ...DEFAULT_HEADERS,
    "Access-Control-Allow-Origin": isAllowedOrigin ? origin : "",
  };

  res.headers.set(
    "Access-Control-Allow-Origin",
    headers["Access-Control-Allow-Origin"]
  );
  res.headers.set(
    "Access-Control-Allow-Methods",
    headers["Access-Control-Allow-Methods"]
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    headers["Access-Control-Allow-Headers"]
  );

  return res;
}

export function handlePreflight(req: NextRequest) {
  const response = new NextResponse(null, { status: 204 });
  return withCORS(req, response);
}
