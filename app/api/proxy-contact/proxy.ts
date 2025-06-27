// app/api/proxy-contact/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.formData();

  const targetRes = await fetch(
    "https://leading-edge-drone-services.vercel.app/api/contact",
    {
      method: "POST",
      body,
    }
  );

  const result = await targetRes.text(); // text() instead of json() for flexibility

  return new NextResponse(result, {
    status: targetRes.status,
    headers: {
      "Content-Type": targetRes.headers.get("Content-Type") || "text/plain",
    },
  });
}
