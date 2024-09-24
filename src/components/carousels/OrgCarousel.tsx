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
import OrgCard from "../cards/OrgCard";

const testOrg = [
  {
    name: "ไทยสตาร์ทอัพ",
    imgUrl:
      "https://drive.google.com/uc?export=view&id=1mzjpHi5GHFrUEEmI_EVLfQE9ht2--ILd",
  },
  {
    name: "SEA Bridge Talent",
    imgUrl:
      "https://drive.google.com/uc?export=view&id=1bsT5WNkFnhhGT7SD3AynO9gqDjzz17lc",
  },
  {
    name: "Educatique Co.",
    imgUrl:
      "https://drive.google.com/uc?export=view&id=1ZR2xgI4izSkZ4fEGEOr54fxDh7t2R-Uf",
  },
  {
    name: "Social Entrepreneur Club",
    imgUrl:
      "https://drive.google.com/uc?export=view&id=1D9ldIaOqNZVaGemuZiKPbHHZOgAv46S9",
  },
  {
    name: "Rabbit Start",
    imgUrl:
      "https://drive.google.com/uc?export=view&id=1UqwGnXRwvZOXfOVAmVKa8oAlzcRzPXMq",
  },
  {
    name: "Builds มหาวิทยาลัยเชียงใหม่",
    imgUrl:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
];

export default function OrgCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
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
      if (window.innerWidth < 640) return 1; // sm
      if (window.innerWidth < 768) return 2; // md
      if (window.innerWidth < 1024) return 3; // lg
      return 4; // xl and above
    }
    return 4; // default for SSR
  };

  const handlePrevNext = (direction: "prev" | "next") => {
    if (!api) return;

    const visibleSlides = getVisibleSlides();
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
    <div className="w-full">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: false,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {testOrg.map((org, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-1">
                <OrgCard name={org.name} imgUrl={org.imgUrl} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* prev v.1 */}
        <CarouselPrevious
          onClick={() => handlePrevNext("prev")}
          className="
            flex absolute left-0 top-[45%] transform -translate-y-1/2 -translate-x-1/2 
            h-12 w-12 bg-orange-dark/80 hover:bg-orange-normal hover:text-white"
        >
          <ChevronLeft className="h-8 w-8" />
        </CarouselPrevious>

        {/* prev v.2 */}
        {/* <div
            onClick={() => handlePrevNext("prev")}
            className="
            flex justify-center items-center absolute left-0 top-[45%] transform -translate-y-1/2 -translate-x-1/2 
            h-12 w-12 bg-orange-dark/80 hover:bg-orange-dark hover:text-white rounded-full"
          >
            <ChevronLeft className="h-8 w-8 translate-x-[-2px]" />
          </div> */}

        {/* next v.1 */}
        <CarouselNext
          onClick={() => handlePrevNext("next")}
          className="
            flex absolute right-0 top-[45%] transform -translate-y-1/2 translate-x-1/2 
            h-12 w-12 bg-orange-dark/80 hover:bg-orange-normal hover:text-white"
        >
          <ChevronRight className="h-8 w-8" />
        </CarouselNext>

        {/* next v.2 */}
        {/* <div
            onClick={() => handlePrevNext("next")}
            className="
            flex justify-center items-center absolute right-0 top-[45%] transform -translate-y-1/2 translate-x-1/2 
            h-12 w-12 bg-orange-dark/80 hover:bg-orange-dark hover:text-white rounded-full"
          >
            <ChevronRight className="h-8 w-8 translate-x-[2px]" />
          </div> */}
      </Carousel>
      {/* dot pagination */}
      {/* <div className="py-2 text-center">
          <div className="flex justify-center space-x-2">
            {Array.from({
              length: Math.ceil(images.length / getVisibleSlides()),
            }).map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index + 1 === current ? "bg-primary" : "bg-muted"
                )}
                onClick={() => api?.scrollTo(index * getVisibleSlides())}
                aria-label={`Go to slide set ${index + 1}`}
              />
            ))}
          </div>
        </div> */}
    </div>
  );
}
