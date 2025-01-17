import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Event } from "@/lib/types";

export async function GET(request: NextRequest) {
  // Parse query parameters
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";

  const maxEventsPerPage = 12;

  // Path to the JSON file
  const filePath = path.join(process.cwd(), "src", "features", "events", "data", "events.json");

  try {
    // Read and parse the events data
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const eventsData = JSON.parse(fileContent);

    // Filter events based on search and category
    const filteredEvents = eventsData.filter((event: Event) => {
      const matchesSearch = search
        ? event.name.toLowerCase().includes(search.toLowerCase())
        : true;
      const matchesCategory = category
        ? event.category.toLowerCase() === category.toLowerCase() ||
          category === "all"
        : true;
      return matchesSearch && matchesCategory;
    });

    // Paginate the results
    const paginatedEvents = filteredEvents.slice(
      (page - 1) * maxEventsPerPage,
      page * maxEventsPerPage
    );

    //wait for 2 seconds before returning the response
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return NextResponse.json({
      events: paginatedEvents,
      total_events: filteredEvents.length,
    });
  } catch (error) {
    console.error("Error reading events data:", error);
    return NextResponse.json(
      { error: "Failed to retrieve events data" },
      { status: 500 }
    );
  }
}
