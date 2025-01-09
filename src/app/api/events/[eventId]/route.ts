import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "eventDetail.json"
    );
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const eventData = JSON.parse(fileContent);

    // Filter or validate the event ID
    if (eventData.event.id !== params.eventId) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(eventData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events details" },
      { status: 500 }
    );
  }
}
