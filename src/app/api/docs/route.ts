import { getApiDocs } from "@/lib/swagger";
import { NextResponse } from "next/server";

export async function GET() {
  // Allow Swagger UI only in development
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({
      error: "Swagger UI is only available in development mode.",
    });
  }
  const spec = await getApiDocs();
  return NextResponse.json(spec);
}
