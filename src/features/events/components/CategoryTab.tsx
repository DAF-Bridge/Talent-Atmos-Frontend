"use client";

import React, { useRef, useEffect, useState, useTransition } from "react";
import { BiNetworkChart } from "react-icons/bi";
import {
  HiOutlineLightBulb,
  HiOutlinePresentationChartBar,
} from "react-icons/hi";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { GrWorkshop } from "react-icons/gr";
import { CgDisplayGrid } from "react-icons/cg";
import { MdOutlinedFlag } from "react-icons/md";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IoIosGlobe } from "react-icons/io";
import { Category } from "@/lib/types";
import LoadingCover from "@/components/common/LoadingCover";

export default function CategoryTab() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
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
      title: "สัมมนา ฟอรัม",
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
      const scrollAmount = 200;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  const handleCategoryClick = async (categoryId: string) => {
    // Create a new URLSearchParams instance
    const params = new URLSearchParams(searchParams);
    // Update the category parameter
    params.set("category", categoryId);

    // Get the base path by removing the existing page/number pattern
    const basePath = pathname.replace(/\/page\/\d+/, "");

    startTransition(() => {
      // Construct new path with page/1 and the category parameter
      router.push(
        `${basePath}/page/1?${params.toString()}`,
        {
          scroll: false,
        }
      );
      router.refresh();
    });
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
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
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

      <div
        ref={scrollContainerRef}
        className="flex md:grid md:grid-cols-8 overflow-x-auto scrollbar-hide gap-4 px-0 mx-9 md:mx-0"
        onScroll={checkScroll}
      >
        {categoriesList.map((category) => (
          <button
            onClick={() => handleCategoryClick(category.id)}
            key={category.id}
            className={`flex flex-col justify-start items-center gap-2 
              min-w-[80px] md:min-w-0 md:w-full rounded-md hover:border
              transition-colors duration-150 py-1
              ${
                currentCategory === category.id
                  ? "text-orange-normal border bg-white"
                  : "text-gray-inactive hover:text-gray-inactive/60"
              }`}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              {React.cloneElement(category.icon as React.ReactElement, {
                className: "w-6 h-6",
              })}
            </div>
            <p className="text-xs md:text-sm font-medium text-center break-words">
              {category.title}
            </p>
          </button>
        ))}
      </div>
      {isPending && <LoadingCover />}
    </div>
  );
}
