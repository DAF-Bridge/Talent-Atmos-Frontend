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
import BriefEventCard from "../cards/BriefEventCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const newEvent = [
  {
    title: "Builds Idea 2024",
    date: "13 ก.ค. - 07 ส.ค. 2567",
    imgUrl:
      "https://drive.google.com/uc?export=view&id=1-wqxOT_uo1pE_mEPHbJVoirMMH2Be3Ks",
  },
  {
    title: "Smart Solution Idea",
    date: "13 ก.ค. - 07 ส.ค. 2567",
    imgUrl:
      "https://drive.google.com/uc?export=view&id=1GfscjgEilPpYZXBoHNgGTy--4v7oTVfO",
  },
  {
    title: "Builds Business 2024",
    date: "13 ก.ค. - 07 ส.ค. 2567",
    imgUrl:
      "https://drive.google.com/uc?export=view&id=1IudlzzRffCIGBQcGtQhoYriBbMhUQGwE",
  },
  {
    title: "Builds Idea 2024",
    date: "13 ก.ค. - 07 ส.ค. 2567",
    imgUrl:
      "https://drive.google.com/uc?export=view&id=1-wqxOT_uo1pE_mEPHbJVoirMMH2Be3Ks",
  },
  {
    title: "Smart Solution Idea",
    date: "13 ก.ค. - 07 ส.ค. 2567",
    imgUrl:
      "https://drive.google.com/uc?export=view&id=1GfscjgEilPpYZXBoHNgGTy--4v7oTVfO",
  },
  {
    title: "Builds Business 2024",
    date: "13 ก.ค. - 07 ส.ค. 2567",
    imgUrl:
      "https://drive.google.com/uc?export=view&id=1IudlzzRffCIGBQcGtQhoYriBbMhUQGwE",
  },
  {
    title: "Builds Idea 2024",
    date: "13 ก.ค. - 07 ส.ค. 2567",
    imgUrl:
      "https://drive.google.com/uc?export=view&id=1-wqxOT_uo1pE_mEPHbJVoirMMH2Be3Ks",
  },
  {
    title: "Smart Solution Idea",
    date: "13 ก.ค. - 07 ส.ค. 2567",
    imgUrl:
      "https://drive.google.com/uc?export=view&id=1GfscjgEilPpYZXBoHNgGTy--4v7oTVfO",
  },
  {
    title: "Builds Business 2024",
    date: "13 ก.ค. - 07 ส.ค. 2567",
    imgUrl:
      "https://drive.google.com/uc?export=view&id=1IudlzzRffCIGBQcGtQhoYriBbMhUQGwE",
  },
];

export default function EventCarousel() {
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

  const getVisibleSlides = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 2; // sm
      if (window.innerWidth < 768) return 3; // md
      if (window.innerWidth < 1024) return 4; // lg
      return 5; // xl and above
    }
    return 5; // default for SSR
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
          {newEvent.map((event, index) => (
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
          onClick={() => handlePrevNext("prev")}
          className="
          hidden sm:flex absolute left-0 top-[45%] transform -translate-y-1/2 -translate-x-1/2 
          h-12 w-12 bg-orange-dark/80 hover:bg-orange-normal hover:text-white"
        >
          <ChevronLeft className="h-8 w-8" />
        </CarouselPrevious>

        {/* next */}
        <CarouselNext
          onClick={() => handlePrevNext("next")}
          className="
          hidden sm:flex absolute right-0 top-[45%] transform -translate-y-1/2 translate-x-1/2 
          h-12 w-12 bg-orange-dark/80 hover:bg-orange-normal hover:text-white"
        >
          <ChevronRight className="h-8 w-8" />
        </CarouselNext>
      </Carousel>

      {/* dot pagination */}
      <div className="py-2 text-center mt-5">
        <div className="flex justify-center gap-4">
          {Array.from({
            length: Math.ceil(newEvent.length / visibleSlides),
          }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-colors",
                 index === Math.floor(current / visibleSlides)
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
