import EventCard from "@/components/cards/EventCard";
import ListPagination from "@/components/Pagination/ListPagination";
import { Event } from "@/lib/types";
import { formatInternalUrl } from "@/lib/utils";
import React from "react";

export interface EventListProps {
  currentPage: string;
  search?: string;
  category?: string;
  maxEventsPerPage: number;
}

export default async function EventList({
  currentPage,
  search,
  category,
  maxEventsPerPage,
}: Readonly<EventListProps>) {
  // Construct the API URL based on search and category
  let apiUrl = `/api/events-paginate?page=${currentPage}&search=${
    search ?? ""
  }&category=${category ?? ""}`;
  apiUrl = formatInternalUrl(apiUrl);

  let events: Event[] = [];
  let totalPages: number = 0;

  try {
    const response = await fetch(apiUrl, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();

    events = data.events;

    // calculate total pages
    totalPages = Math.ceil(data.total_events / maxEventsPerPage);
  } catch (error) {
    console.error("Error fetching events:", error);
  }
  return (
    <>
      {events.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-[5%] lg:gap-x-[3%] mt-[25px]">
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
                orgName={event.organization.name}
                orgPicUrl={event.organization.picUrl}
                showOrg={false}
              />
            ))}
          </div>
          <div className="flex justify-center items-center mt-[50px]">
            {totalPages > 1 && (
              <ListPagination totalPages={totalPages} type="events" />
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center mt-[100px] mb-[150px]">
          <p className="text-2xl font-medium text-gray-600 mb-2">
            ไม่พบอีเว้นท์
          </p>
          <p className="text-gray-500">
            กรุณาลองค้นหาด้วยคำค้นอื่น หรือลองเปลี่ยนตัวกรอง
          </p>
        </div>
      )}
    </>
  );
}
