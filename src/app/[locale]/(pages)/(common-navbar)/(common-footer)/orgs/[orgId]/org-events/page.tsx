import EventCard from "@/components/common/EventCard";
import Spinner from "@/components/ui/spinner";
import { Event } from "@/lib/types";
import { formatExternalUrl } from "@/lib/utils";
import React, { Suspense } from "react";

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
    <Suspense fallback={<Spinner />}>
      {events.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-12  gap-x-[5%] lg:gap-x-[3%]">
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
      ) : (
        <div className="flex flex-col items-center justify-center mt-[60px] mb-[150px] text-center">
          <p className="text-2xl font-medium text-gray-600 mb-2">
            ไม่พบอีเว้นท์
          </p>
          <p className="text-gray-500">
          องค์กรนี้ยังไม่เคยให้ข้อมูลเกี่ยวกับกิจกรรม หรือยังไม่เคยจัดกิจกรรมใด ๆ มาก่อน
          </p>
        </div>
      )}
    </Suspense>
  );
}
