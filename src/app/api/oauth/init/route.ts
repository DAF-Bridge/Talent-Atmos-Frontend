import { NextResponse } from "next/server";

export async function GET() {
  const GOLANG_AUTH_URL = process.env.GO_API_URL + "/auth/google";

  return NextResponse.redirect(GOLANG_AUTH_URL);
}
