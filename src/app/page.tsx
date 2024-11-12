import EventCarousel from "@/components/carousels/EventCarousel";
import OrgCarousel from "@/components/carousels/OrgCarousel";
import HomeTrendingEvent from "@/components/HomeTrendingEvent";
import BigFooter from "@/components/layout/BigFooter";
import NavigationBar from "@/components/layout/NavBar";

export default function Home() {
  return (
    <>
      <NavigationBar />
      <div className="font-prompt lg:w-[90%] xl:w-[80%] mx-auto px-10 pb-5">
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
          <EventCarousel />
        </div>

        {/* อีเว้นท์อนาคต */}
        <div className="font-medium text-2xl border-b-2 pt-[60px] pb-[11px]">
          อีเว้นท์อนาคต
        </div>
        <div className="flex justify-between mt-4">
          <EventCarousel />
        </div>

        {/* องค์กรพันธมิตร */}
        <div className="font-medium text-2xl border-b-2 pt-[60px] pb-[11px]">
          องค์กรพันธมิตร
        </div>
        <div className="flex justify-between mt-4 ">
          <OrgCarousel />
        </div>
      </div>
      <BigFooter/>
    </>
  );
}
