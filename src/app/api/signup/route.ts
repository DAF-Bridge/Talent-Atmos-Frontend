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

    // Delay for 3 seconds before sending the response
    // await new Promise((resolve) => setTimeout(resolve, 3000)); // 3000 ms = 3 seconds

    // If validation failed, return the error response
    if (Object.keys(zodErrors).length > 0) {
      return NextResponse.json({ errors: zodErrors }, { status: 400 });
    }

    // Send data to Golang backend if validation is successful
    const apiUrl = formatExternalUrl("/signup");

    const dataToBeSend = {
      name: result.data?.firstName + " " + result.data?.lastName,     
      email: result.data?.email,    
      password: result.data?.password,
      phone: result.data?.phone,    
    }

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToBeSend), // Send validated data
    });

    if (!res.ok) {
      // If the Go backend returns an error
      const errorData = await res.json();
      return NextResponse.json(
        { errors: errorData.message || "Failed to signup" },
        { status: res.status }
      );
    }

    // If the backend responds successfully, parse the response
    const resData = await res.json();

    // Extract the JWT token from the response
    const { token } = resData;

    if (!token) {
      return NextResponse.json(
        { error: "No token received from Go backend" },
        { status: 500 }
      );
    }

    // Return the token in the response
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Error in POST API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
