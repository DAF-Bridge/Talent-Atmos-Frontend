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
import OrgCard from "../cards/OrgCard";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Organization } from "@/lib/types";

export default function OrgCarousel({ orgs }: { readonly orgs: Organization[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(5);

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
    setCount(orgs.length);
  }, [orgs.length]);

  const getVisibleSlides = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 2; // sm basis-1/2
      if (window.innerWidth < 768) return 2; // md sm:basis-1/2
      if (window.innerWidth < 1024) return 3; // lg  md:basis-1/3
      return 4; // lg:basis-1/4
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
          {orgs.map((org, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-1">
                <OrgCard name={org.name} imgUrl={org.imgUrl} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* prev */}
        <CarouselPrevious
          onClick={() => handlePrevNext("prev")}
          className="
            hidden sm:flex absolute left-0 top-[45%] transform -translate-y-1/2 -translate-x-1/2 
            h-12 w-12 bg-black/50 hover:bg-black/70 hover:text-white text-white border-none"
        ></CarouselPrevious>

        {/* next */}
        <CarouselNext
          onClick={() => handlePrevNext("next")}
          className="
            hidden sm:flex absolute right-0 top-[45%] transform -translate-y-1/2 translate-x-1/2 
            h-12 w-12 bg-black/50 hover:bg-black/70 hover:text-white text-white border-none"
        ></CarouselNext>
      </Carousel>
      {/* dot pagination */}
      <div className="py-2 text-center mt-5">
        <div className="flex justify-center gap-4">
          {Array.from({
            length: Math.ceil(orgs.length / visibleSlides),
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
