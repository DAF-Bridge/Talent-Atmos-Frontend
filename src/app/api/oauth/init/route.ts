import { formatExternalUrl } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const GOLANG_AUTH_URL = formatExternalUrl("/auth/google")

  // Use 307 Temporary Redirect to preserve the request method
  return NextResponse.redirect(GOLANG_AUTH_URL, { status: 307 });
}
