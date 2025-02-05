import { signupSchema } from "@/lib/types";
import { formatExternalUrl } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
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

    // If validation failed, return the error response
    if (Object.keys(zodErrors).length > 0) {
      return NextResponse.json(
        { errors: zodErrors, status: 400 },
        { status: 400 }
      );
    }

    // Send data to Golang backend if validation is successful

    const dataToBeSend = {
      name: result.data?.firstName + " " + result.data?.lastName,
      email: result.data?.email,
      password: result.data?.password,
      phone: result.data?.phone,
    };

    const apiUrl = formatExternalUrl("/signup");
    const res = await fetch(apiUrl, {
      cache: "no-store",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToBeSend), // Send validated data
    });

    if (!res.ok) {
      // If the Go backend returns an error
      const errorData = await res.json();

      return NextResponse.json(
        { errors: errorData.error || "Failed to signup" },
        { status: res.status }
      );
    }

    const setCookieHeader = res.headers.get("set-cookie");
    if (setCookieHeader) {
      // Use NextResponse to forward the Set-Cookie header to the client
      const response = NextResponse.json({ status: 200 });
      response.headers.set("set-cookie", setCookieHeader);
      return response;
    } else {
      return NextResponse.json(
        { error: "Failed to set cookie" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in POST API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
