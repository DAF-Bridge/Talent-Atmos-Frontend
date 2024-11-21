"use client";

import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

// Skeleton placeholder for loading state
function JobCardSkeleton() {
  return (
    <div className="flex flex-row gap-[5%] border rounded-[8px] px-2 ">
      <div className="my-auto w-[33%] h-full">
        <Skeleton
          style={{ aspectRatio: "1 / 1" }}
          className="h-full w-full  bg-slate-200"
        ></Skeleton>
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
  const [visibleSlides, setVisibleSlides] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      setVisibleSlides(getVisibleSlides());
    };

    handleResize(); // Call once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const getVisibleSlides = () => {
    if (typeof window !== "undefined") {
      //
      if (window.innerWidth < 640) return 1; // sm basis-none
      if (window.innerWidth < 768) return 3; // md sm:basis-1/3
      if (window.innerWidth < 1024) return 4; // lg md:basis-1/3
      return 5; // and above lg:basis-1/5
    }
    return 5; // default for SSR
  };
  return (
    <div className="w-full">
      <Carousel className="w-full h-auto">
        <CarouselContent className="-ml-2 md:-ml-4">
          {Array.from({ length: visibleSlides }).map((_, index) => (
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
