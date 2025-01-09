import EventCard from "@/components/cards/EventCard";
import { Event } from "@/lib/types";
import { formatExternalUrl } from "@/lib/utils";
import React from "react";

export default async function page() {
  const apiUrl = formatExternalUrl("/events");
  let events: Event[] = [];

  try {
    const response = await fetch(apiUrl, { cache: "no-cache" });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    events = await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-12  gap-x-[5%] lg:gap-x-[3%]">
      {/* display at minimum 12 events per page */}
      {events.map((event) => (
        <EventCard
          key={event.id}
          cardId={event.id.toString()}
          title={event.name}
          startDate={event.startDate}
          endDate={event.endDate}
          startTime={event.startTime}
          endTime={event.endTime}
          location={event.location}
          imgUrl={event.picUrl}
          orgName="มหาวิทยาลัยเชียงใหม่"
          orgPicUrl="https://drive.google.com/uc?export=view&id=1mzjpHi5GHFrUEEmI_EVLfQE9ht2--ILd"
          showOrg={false}
        />
      ))}
    </div>
  );
}
