"use client";

import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";

// Skeleton placeholder for loading state
function JobCardSkeleton() {
  return (
    <div className="flex flex-row gap-[5%] border rounded-[8px] px-2 bg-white">
      <div className="my-auto w-[33%] h-full">
        <div
          style={{ aspectRatio: "1 / 1" }}
          className="h-full w-full  bg-slate-200 animate-pulse rounded-full"
        ></div>
      </div>
      <div className="flex flex-col justify-start py-[5%] h-full w-full">
        <Skeleton className="h-6 w-[70%] bg-slate-200" />
        <Skeleton className="h-6 w-[80%] bg-slate-200" />
        <Skeleton className="h-5 w-[40%] bg-slate-200" />
      </div>
    </div>
  );
}

export default function JobCarouselSkeleton() {
  return (
    <div className="w-full">
      <Carousel className="w-full h-auto">
        <CarouselContent className="-ml-2 md:-ml-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-none sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <div className="p-1">
                <JobCardSkeleton />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
