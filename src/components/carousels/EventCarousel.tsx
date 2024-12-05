"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BriefEventCard from "../cards/BriefEventCard";
import { Event } from "@/lib/types";

export default function EventCarousel({
  events,
}: {
  readonly events: Event[];
}) {
  return (
    <div className="w-full ">
      <Carousel
        className="w-full h-auto"
        opts={{
          align: "start",
          loop: false,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {events.map((event, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <div className="p-1">
                <BriefEventCard
                  title={event.title}
                  date={event.date}
                  imgUrl={event.imgUrl}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* prev */}
        <CarouselPrevious
          className="
          hidden sm:flex absolute left-0 top-[45%] transform -translate-y-1/2 -translate-x-1/2 
          h-12 w-12 bg-black/50 hover:bg-black/70 hover:text-white text-white border-none"
        ></CarouselPrevious>

        {/* next */}
        <CarouselNext
          className="
          hidden sm:flex absolute right-0 top-[45%] transform -translate-y-1/2 translate-x-1/2 
          h-12 w-12 bg-black/50 hover:bg-black/70 hover:text-white text-white border-none"
        ></CarouselNext>
      </Carousel>
    </div>
  );
}
