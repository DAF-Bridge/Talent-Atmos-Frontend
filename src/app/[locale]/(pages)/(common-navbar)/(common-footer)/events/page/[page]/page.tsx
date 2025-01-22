import React, { Suspense } from "react";
import { EventListSkeleton } from "@/features/events/components/EventListSkeleton";
import { Category } from "@/lib/types";
import CategoryTab from "@/features/events/components/CategoryTab";
import { EventSearch } from "@/features/events/components/EventSearch";
import { EventFilter } from "@/features/events/components/EventFilter";
import EventList from "@/components/common/EventList";
import { redirect } from "@/i18n/routing";
import { fetchEvents } from "@/features/events/api/fetchEvents";
export const dynamic = "force-dynamic"; // Ensure fresh data on each request

export default async function EventListingPageComp({
  params,
  searchParams,
}: Readonly<{
  params: { page: string; locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}>) {
  const maxEventsPerPage = 12;
  const currentPage = params.page || "1";
  const search = searchParams.search?.toString() ?? "";
  const category = searchParams.category?.toString() ?? "";
  const dateRange = searchParams.dateRange?.toString() ?? "";
  const location = searchParams.location?.toString() ?? "";
  const audience = searchParams.audience?.toString() ?? "";
  const price = searchParams.price?.toString() ?? "";

  const { events, totalEvents } = await fetchEvents({
    page: currentPage,
    search,
    category,
    dateRange,
    location,
    audience,
    price,
    maxEventsPerPage,
  });

  // calculate total pages
  const totalPages = Math.ceil(totalEvents / maxEventsPerPage);

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
    redirect({
      href: "/events/page/1?category=all",
      locale: params.locale,
    });
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
        <EventList events={events} totalPages={totalPages} />
      </Suspense>
    </div>
  );
}
