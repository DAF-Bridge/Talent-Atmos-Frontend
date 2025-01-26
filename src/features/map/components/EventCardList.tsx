import { Event } from "@/lib/types";
import React from "react";
import EventMapCard from "./EventMapCard";

interface EventCardListProps {
  events: Event[];
  selectedEvent: Event | null;
  handleCardClick: (event: Event) => void;
}

export default function EventCardList({
  events,
  selectedEvent,
  handleCardClick,
}: Readonly<EventCardListProps>) {
  return (
    <div className="flex flex-col gap-1 h-full">
      {events.length > 0 ? (
        events.map((event) => (
          <EventMapCard
            key={event.id}
            event={event}
            isSelected={selectedEvent?.id === event.id}
            onCardClick={handleCardClick}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center mt-[100px] mb-[150px]">
          <p className="text-2xl font-medium text-gray-600 mb-2">ไม่พบอีเว้นท์</p>
          {/* <p className="text-gray-500">
            กรุณาลองค้นหาด้วยคำค้นอื่น หรือลองเปลี่ยนตัวกรอง
          </p> */}
        </div>
      )}
    </div>
  );
}
