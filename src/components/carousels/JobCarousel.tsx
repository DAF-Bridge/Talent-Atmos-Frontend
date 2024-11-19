"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import JobCard from "../cards/JobCard";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type Job = {
  orgName: string;
  imgUrl: string;
  jobTitle: string;
  location: string;
};

export default function JobCarousel() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
    const [visibleSlides, setVisibleSlides] = useState(5);
    const [jobs, setJobs] = useState<Job[]>([]);
  
    useEffect(() => {
      const handleResize = () => {
        setVisibleSlides(getVisibleSlides());
      };
  
      handleResize(); // Call once on mount
      window.addEventListener("resize", handleResize);
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    useEffect(() => {
      if (!api) {
        return;
      }
  
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
  
      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    }, [api]);
  
    useEffect(() => {
      fetch("/api/jobs")
        .then((res) => res.json())
        .then((data) => {
          setCount(data.data.length);
          setJobs(data.data);
        })
        .catch(error => {
          console.error("There was an error fetching the jobs!", error);
        });
    }, []);
  
    const getVisibleSlides = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 640) return 2; // sm
        if (window.innerWidth < 768) return 2; // md
        if (window.innerWidth < 1024) return 3; // lg
        return 4; // xl and above
      }
      return 4; // default for SSR
    };
  
    const handlePrevNext = (direction: "prev" | "next") => {
      if (!api) return;
  
      const currentIndex = api.selectedScrollSnap();
      let targetIndex;
  
      if (direction === "prev") {
        targetIndex = Math.max(0, currentIndex - visibleSlides);
      } else {
        targetIndex = Math.min(count - 1, currentIndex + visibleSlides);
      }
  
      api.scrollTo(targetIndex);
    };
  
    return (
      <div className="w-full ">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            loop: false,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {jobs.map((job, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-1/3 sm:basis-1/3 md:basis-1/4 lg:basis-1/4 2xl:basis-1/5"
              >
                <div className="p-1">
                  <JobCard orgName={job.orgName} imgUrl={job.imgUrl} jobTitle={job.jobTitle} location={job.location}/>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
  
          {/* prev */}
          <CarouselPrevious
            onClick={() => handlePrevNext("prev")}
            className="
              hidden sm:flex absolute left-0 top-[45%] transform -translate-y-1/2 -translate-x-1/2 
              h-12 w-12 bg-black/50 hover:bg-orange-dark hover:text-white text-white border-none bg-orange-300"
          ></CarouselPrevious>
  
          {/* next */}
          <CarouselNext
            onClick={() => handlePrevNext("next")}
            className="
              hidden sm:flex absolute right-0 top-[45%] transform -translate-y-1/2 translate-x-1/2 
              h-12 w-12 bg-black/50 hover:bg-orange-dark hover:text-white text-white border-none bg-orange-300"
          ></CarouselNext>
        </Carousel>

        {/* dot pagination */}
        <div className="py-2 text-center mt-5">
          <div className="flex justify-center gap-4">
            {Array.from({
              length: Math.ceil(jobs.length / visibleSlides),
            }).map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-colors",
                  index === Math.round(current / visibleSlides)
                    ? "bg-orange-dark"
                    : "border border-orange-dark"
                )}
                onClick={() => api?.scrollTo(index * visibleSlides)}
                aria-label={`Go to slide set ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    );
  }