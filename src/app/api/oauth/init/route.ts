import { formatExternalUrl } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const GOLANG_AUTH_URL = formatExternalUrl("/auth/google")

  return NextResponse.redirect(GOLANG_AUTH_URL);
}
