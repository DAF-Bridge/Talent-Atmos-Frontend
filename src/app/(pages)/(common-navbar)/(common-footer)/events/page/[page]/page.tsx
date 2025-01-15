import React, { Suspense } from "react";

import { EventListSkeleton } from "@/features/events/components/EventListSkeleton";
import { redirect } from "next/navigation";
import { Category } from "@/lib/types";
import CategoryTab from "@/features/events/components/CategoryTab";
import { EventSearch } from "@/features/events/components/EventSearch";
import { EventFilter } from "@/features/events/components/EventFilter";
import EventList from "@/features/events/components/EventList";
export const dynamic = "force-dynamic"; // Ensure fresh data on each request

export default async function EventListingPageComp({
  params,
  searchParams,
}: Readonly<{
  params: { page: string };
  searchParams: { [key: string]: string | string[] | undefined };
}>) {
  const maxEventsPerPage = 12;

  const currentPage = params.page || "1";
  const search = searchParams.search?.toString() ?? "";
  const category = searchParams.category?.toString() ?? "";

  const availableCategories: Category["id"][] = [
    "all",
    "incubation",
    "networking",
    "forum",
    "exhibition",
    "competition",
    "workshop",
    "campaign",
  ];

  if (!category || !availableCategories.includes(category as Category["id"])) {
    redirect(`?category=all`);
  }

  return (
    <div className="font-prompt max-w-[1170px] mx-auto px-6 mt-[90px] sm:mt-[100px] min-h-[80vh]">
      <p className="text-xl md:text-3xl text-center font-semibold">
        ค้นหา <span className="text-orange-normal">&quot;อีเว้นท์&quot;</span>{" "}
        ที่ตอบโจทย์
      </p>
      <div className="border-[1.5px] mt-[15px] sm:mt-[20px] border-gray-stroke/70" />
      <CategoryTab />
      <div className="flex justify-between items-center gap-5 w-full mt-[20px]">
        <EventSearch defaultValue={search} />
        <EventFilter />
      </div>
      <Suspense
        fallback={<EventListSkeleton maxEventsPerPage={maxEventsPerPage} />}
      >
        <EventList
          currentPage={currentPage}
          search={search}
          category={category}
          maxEventsPerPage={maxEventsPerPage}
        />
      </Suspense>
    </div>
  );
}
