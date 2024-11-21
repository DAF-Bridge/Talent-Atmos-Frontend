import { signupSchema } from "@/lib/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Parse the incoming request body
  const body: unknown = await req.json();

  // Validate the data using Zod schema
  const result = signupSchema.safeParse(body);
  let zodErrors = {};

  // Collect validation errors if any
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  }

  // Delay for 3 seconds before sending the response
  await new Promise((resolve) => setTimeout(resolve, 3000)); // 3000 ms = 3 seconds

  // If validation failed, return the error response
  if (Object.keys(zodErrors).length > 0) {
    return NextResponse.json({ errors: zodErrors }, { status: 400 });
  }

  //----------------------------------------------------------

  // Send data to Golang backend if validation is successful, PUT YOUR CODE HERE

  //----------------------------------------------------------

  // Return success response
  if (Object.keys(zodErrors).length == 0) {
    return NextResponse.json({ success: true }, { status: 200 });
  }
}
