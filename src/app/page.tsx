import HomeTrendingEvent from "@/components/HomeTrendingEvent";
import BigFooter from "@/components/layout/BigFooter";
import NavigationBar from "@/components/layout/Navbar/NavBar";
import EventCarouselSkeleton from "@/components/skeletons/EventCarouselSkeleton";
import OrgCarouselSkeleton from "@/components/skeletons/OrgCarouselSkeleton";
import { lazy, Suspense } from "react";

// lazy load
const RecentEventCarouselWrapper = lazy(
  () => import("@/components/wrappers/RecentEventWrapper")
);
const OrgCarouselWrapper = lazy(
  () => import("@/components/wrappers/OrgCarouselWrapper")
);

export default function Home() {
  return (
    <>
      <NavigationBar />
      <div className="font-prompt max-w-[1170px] mx-auto px-10 pb-5">
        <div className="font-medium text-2xl border-b-2 pt-[25px] pb-[11px]">
          อีเว้นท์มาแรง
        </div>
        <div>
          <HomeTrendingEvent />
        </div>

        {/* อีเว้นท์ใหม่ */}
        <div className="font-medium text-2xl border-b-2 pt-[60px] pb-[11px]">
          อีเว้นท์ใหม่
        </div>
        <div className="flex justify-between mt-4">
          <Suspense fallback={<EventCarouselSkeleton />}>
            <RecentEventCarouselWrapper />
          </Suspense>
        </div>

        {/* อีเว้นท์อนาคต */}
        <div className="font-medium text-2xl border-b-2 pt-[60px] pb-[11px]">
          อีเว้นท์อนาคต
        </div>
        <div className="flex justify-between mt-4">
          <Suspense fallback={<EventCarouselSkeleton />}>
            <RecentEventCarouselWrapper />
          </Suspense>
        </div>

        {/* องค์กรพันธมิตร */}
        <div className="font-medium text-2xl border-b-2 pt-[60px] pb-[11px]">
          องค์กรพันธมิตร
        </div>
        <div className="flex justify-between mt-4 ">
          <Suspense fallback={<OrgCarouselSkeleton />}>
            <OrgCarouselWrapper />
          </Suspense>
        </div>
      </div>
      <BigFooter />
    </>
  );
}
