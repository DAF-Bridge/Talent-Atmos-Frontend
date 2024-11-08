import { signupSchema } from "@/lib/types";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body: unknown = await req.json();

  const result = signupSchema.safeParse(body);
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  }

  if (Object.keys(zodErrors).length > 0) {
    return NextResponse.json({ errors: zodErrors }, { status: 400 });
  } else {
    return NextResponse.json({ success: true }, { status: 200 });
  }
}
