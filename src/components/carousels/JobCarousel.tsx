"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import JobCard from "../cards/JobCard";
import { Job } from "@/lib/types";

export default function JobCarousel({ jobs }: { readonly jobs: Job[] }) {
  return (
    <div className="w-full">
      <Carousel
        className="w-full h-auto"
        opts={{
          align: "start",
          loop: false,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {jobs.map((job, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-none sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <div className="p-1">
                <JobCard
                  orgName={job.orgName}
                  imgUrl={job.imgUrl}
                  jobTitle={job.jobTitle}
                  location={job.location}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* prev */}
        <CarouselPrevious
          className="
          hidden sm:flex absolute left-0 top-[45%] transform -translate-y-3 -translate-x-full
          h-9 w-9 bg-black/50 hover:bg-black/70 hover:text-white text-white border-none"
        ></CarouselPrevious>

        {/* next */}
        <CarouselNext
          className="
          hidden sm:flex absolute right-0 top-[45%] transform -translate-y-3 translate-x-full
          h-9 w-9 bg-black/50 hover:bg-black/70 hover:text-white text-white border-none"
        ></CarouselNext>
      </Carousel>
    </div>
  );
}
