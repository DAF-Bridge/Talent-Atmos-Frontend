"use client";

import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";

// Skeleton placeholder for loading state
function OrgCardSkeleton() {
  return (
    <div className="flex flex-col rounded-[8px] gap-1">
      <Skeleton
        className="h-full w-full rounded-[8px] bg-slate-200"
        style={{ aspectRatio: "5 / 3" }}
      />
      {/* <Skeleton className="h-5 w-full bg-slate-200" /> */}
    </div>
  );
}

export default function OrgCarouselSkeleton() {
  return (
    <div className="w-full ">
      <Carousel className="w-full h-auto">
        <CarouselContent className="-ml-2 md:-ml-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-1">
                <OrgCardSkeleton />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
