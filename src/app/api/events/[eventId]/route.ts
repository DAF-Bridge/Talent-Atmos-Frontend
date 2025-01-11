import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { EventDescriptionProps } from "@/lib/types";

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
    const eventDataArray = JSON.parse(fileContent);

    // Filter or validate the event ID
    const eventData = eventDataArray.find(
      (event: EventDescriptionProps) =>
        event.event.id === parseInt(params.eventId)
    );

    return NextResponse.json(eventData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events details" },
      { status: 500 }
    );
  }
}
