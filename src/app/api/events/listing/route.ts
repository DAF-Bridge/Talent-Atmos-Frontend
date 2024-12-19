import { formatExternalUrl } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") ?? "1"; // Default to page 1 if not provided

    const apiUrl = formatExternalUrl("/events-paginate?page=" + page);
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // If the Go backend returns an error
      const errorData = await response.json();
      return NextResponse.json(
        { errors: errorData.message || "Failed to fetch events" },
        { status: response.status }
      );
    }

    // If the backend responds successfully, parse the response
    const resData = await response.json();

    return NextResponse.json({ resData });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to connect to Go backend" },
      { status: 500 }
    );
  }
}
