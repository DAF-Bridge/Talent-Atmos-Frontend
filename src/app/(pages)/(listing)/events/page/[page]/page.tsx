import EventCard from "@/components/cards/EventCard";
import ListPagination from "@/components/Pagination/ListPagination";
import { Event } from "@/lib/types";
import { formatInternalUrl } from "@/lib/utils";
import { Search, SlidersHorizontal } from "lucide-react";
import React from "react";
export const dynamic = "force-dynamic"; // Ensure fresh data on each request

export default async function EventListingPage({
  params,
}: Readonly<{ params: { page: string } }>) {
  const currentPage = Number(params.page) || 1;
  const maxEventsPerPage = 12;
  const apiUrl = formatInternalUrl(`/api/events/listing?page=${currentPage}`);

  let events: Event[] = [];
  let totalPages: number = 0;

  try {
    const response = await fetch(apiUrl, { cache: "no-cache" });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();

    events = data.resData.events;
    // calculate total pages
    totalPages = Math.ceil(data.resData.total_events / maxEventsPerPage);
  } catch (error) {
    console.error("Error fetching events:", error);
  }

  // console.log(events, " Total", totalPages);

  return (
    <div className="font-prompt max-w-[1170px] mx-auto px-10">
      <p className="text-[32px] text-center font-semibold mt-[22px]">
        ค้นหา <span className="text-orange-normal">&quot;อีเว้นท์&quot;</span>{" "}
        ที่ตอบโจทย์
      </p>
      <div className="border-[1.5px] mt-[26px] border-gray-stroke/70" />
      <div className="flex justify-between items-center gap-5 w-full mt-[25px] ">
        <div className="flex-grow bg-white relative max-w-[455px] border border-gray-300 rounded-full">
          <input
            type="text"
            placeholder="ค้นหาคีย์เวิร์ด"
            className="flex-grow  h-[48px] w-full px-4 py-2 placeholder:text-gray-inactive placeholder:font-light text-gray-700 bg-transparent outline-none"
          />
          <div className="bg-white absolute top-0 rounded-r-full pr-1 right-0 h-[48px] w-[55px] flex items-center justify-end">
            <button className=" bg-orange-normal hover:bg-orange-normal/80 transition-all duration-200 flex justify-center items-center h-[40px] w-[40px] rounded-full ">
              <Search className="h-[18px] w-[18px] text-white" />
            </button>
          </div>
        </div>
        <button className="flex justify-center items-center border bg-white hover:drop-shadow-md border-gray-stroke rounded-[10px] h-[48px] min-w-[48px] px-3 max-w-[104px] text-gray-btngray">
          <SlidersHorizontal className="h-[18px] w-[18px]" />
          <span className="hidden sm:block text-sm font-medium ml-2">
            ตัวกรอง
          </span>
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-12  gap-x-[5%] lg:gap-x-[3%] mt-[25px]">
        {/* display at minimum 12 events per page */}
        {events.map((event) => (
          <EventCard
            key={event.id}
            cardId={event.id.toString()}
            title={event.Name}
            date={`${event.StartDate} - ${event.EndDate}`}
            time={`${event.StartTime} - ${event.EndTime}`}
            location={event.Location}
            imgUrl={event.PicUrl}
            orgName="มหาวิทยาลัยเชียงใหม่"
            orgPicUrl="https://drive.google.com/uc?export=view&id=1mzjpHi5GHFrUEEmI_EVLfQE9ht2--ILd"
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-[50px]">
        <ListPagination totalPages={totalPages} />
      </div>
    </div>
  );
}
