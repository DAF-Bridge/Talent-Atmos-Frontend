"use client";

import { Skeleton } from "../ui/skeleton";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

// Skeleton placeholder for loading state
function BriefEventCardSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      <Skeleton
        className="h-full w-full rounded-[8px] bg-slate-200"
        style={{ aspectRatio: "3 / 4" }}
      />
    </div>
  );
}

export default function EventCarouselSkeleton() {
  return (
    <div className="w-full ">
      <Carousel className="w-full h-auto">
        <CarouselContent className="-ml-2 md:-ml-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <div className="p-1">
                <BriefEventCardSkeleton />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
