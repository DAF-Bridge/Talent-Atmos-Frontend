"use client";

import React, { useRef, useEffect, useState } from "react";
import { BiNetworkChart } from "react-icons/bi";
import {
  HiOutlineLightBulb,
  HiOutlinePresentationChartBar,
} from "react-icons/hi";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { GrWorkshop } from "react-icons/gr";
import { CgDisplayGrid } from "react-icons/cg";
import { MdOutlinedFlag } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IoIosGlobe } from "react-icons/io";
import { Category } from "@/lib/types";

export default function CategoryTab() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categoriesList: Category[] = [
    {
      icon: <IoIosGlobe />,
      id: "all",
      title: "ทั้งหมด",
    },
    {
      icon: <HiOutlineRocketLaunch />,
      id: "incubation",
      title: "บ่มเพาะธุรกิจ",
    },
    {
      icon: <BiNetworkChart />,
      id: "networking",
      title: "สร้างเครือข่าย",
    },
    {
      icon: <HiOutlinePresentationChartBar />,
      id: "forum",
      title: "สัมมนา & ฟอรัม",
    },
    {
      icon: <CgDisplayGrid />,
      id: "exhibition",
      title: "นิทรรศการจัดแสดง",
    },
    {
      icon: <HiOutlineLightBulb />,
      id: "competition",
      title: "การแข่งขัน",
    },
    {
      icon: <GrWorkshop />,
      id: "workshop",
      title: "เวิร์คชอปให้ความรู้",
    },
    {
      icon: <MdOutlinedFlag />,
      id: "campaign",
      title: "แคมเปญ",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200; // Adjust this value as needed
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  // Hide scroll buttons when not needed
  const [showButtons, setShowButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5); // 5px threshold
      setShowButtons(scrollWidth > clientWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  return (
    <div className="relative w-full my-[15px]">
      {/* Scroll Buttons - Only shown on mobile when needed */}
      {showButtons && (
        <>
          <button
            onClick={() => scroll("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md md:hidden
              ${!canScrollLeft ? "hidden" : ""}`}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md md:hidden
              ${!canScrollRight ? "hidden" : ""}`}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </>
      )}

      {/* Categories Container */}
      <div
        ref={scrollContainerRef}
        className="flex md:grid md:grid-cols-8 overflow-x-auto scrollbar-hide gap-4 px-0 mx-9 md:mx-0"
        onScroll={checkScroll}
      >
        {categoriesList.map((category) => (
          <a
            href={`/events/page/1?category=${category.id}`}
            key={category.id}
            className={`flex flex-col justify-start items-center gap-2 
              min-w-[80px] md:min-w-0 md:w-full rounded-md hover:border
              transition-colors duration-150 py-1
              ${
                currentCategory === category.id
                  ? "text-orange-normal border  bg-white"
                  : "text-gray-inactive hover:text-gray-inactive/60"
              }`}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              {React.cloneElement(category.icon as React.ReactElement, {
                className: "w-6 h-6", // Fixed icon size
              })}
            </div>
            <p className="text-xs md:text-sm font-medium text-center whitespace-normal">
              {category.title}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
