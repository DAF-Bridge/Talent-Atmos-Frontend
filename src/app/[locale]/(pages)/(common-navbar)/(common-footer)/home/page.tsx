import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import HeroSection from "@/features/home/components/hero";
import EventCarousel from "@/features/home/components/EventCarousel";
import JobShowcase from "@/features/home/components/JobShowcase";
import OrgCarousel from "@/features/home/components/OrgCarousel";
import {
  getFeaturedEvents,
  getRecentJobs,
  getRecentOrgs,
} from "@/features/home/api/action";
import { Event, JobCardProps, OrganizationBrief } from "@/lib/types";

export default async function Home({
  params,
}: Readonly<{
  params: { locale: string }; // Accept event ID from URL params
}>) {
  const recentJobs: JobCardProps[] = await getRecentJobs();
  // console.log("recentJobs: " + recentJobs);
  const recentOrgs: OrganizationBrief[] = await getRecentOrgs();
  // console.log("recentOrgs: " + recentOrgs);
  const featuredEvents: Event[] = await getFeaturedEvents();
  // console.log("featuredEvents: " + featuredEvents);
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      <main className="font-prompt flex-grow">
        {/* Events Section */}
        {featuredEvents && featuredEvents.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-[1170px] mx-auto px-6">
              <div className="flex justify-between items-center mb-8 gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    อีเว้นท์สำหรับคุณ
                  </h2>
                  <p className="text-gray-600 mt-2">
                    ค้นพบอีเว้นท์ที่เหมาะสมในการแสดงจุดแข็งของคุณ
                  </p>
                </div>
              </div>
              {/* Recommended Events */}
              <EventCarousel events={featuredEvents} />
            </div>
          </section>
        )}

        {/* Events Section */}
        {featuredEvents && featuredEvents.length > 0 && (
          <section className="pb-16 bg-white">
            <div className="max-w-[1170px] mx-auto px-6">
              <div className="flex justify-between items-center mb-8 gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    อีเว้นท์ที่เราแนะนำ
                  </h2>
                  <p className="text-gray-600 mt-2">
                    อีเว้นท์ที่มาแรง ตามกระแสเทรนด์ในปัจจุบัน
                  </p>
                </div>
                <Link
                  href="/events/page/1?category=all"
                  className="text-orange-dark hover:text-orange-normal flex items-center gap-1 font-medium shrink-0 group"
                >
                  ดูทั้งหมด{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                </Link>
              </div>

              {/* Featured Events */}
              <EventCarousel events={featuredEvents} />
            </div>
          </section>
        )}

        {/* Jobs Section */}
        {recentJobs && recentJobs.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-[1170px] mx-auto px-6">
              <div className="flex justify-between items-center mb-8 gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    ตำแหน่งงานล่าสุด
                  </h2>
                  <p className="text-gray-600 mt-2">
                    โอกาสในการพัฒนาองค์กร และทำเพื่อสังคม
                  </p>
                </div>
                {/* <Link
                href="/jobs"
                className="text-orange-dark hover:text-orange-normal flex items-center gap-1 font-medium shrink-0"
              >
                ดูทั้งหมด <ArrowRight className="w-4 h-4" />
              </Link> */}
              </div>

              <JobShowcase jobs={recentJobs} />

              <div className="flex justify-center mt-10">
                <Link
                  href="/jobs/page/1"
                  className="bg-white border border-orange-normal text-orange-dark hover:bg-orange-50 px-8 py-2 rounded-md"
                >
                  ดูตำแหน่งงานเพิ่มเติม
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Organizations Section */}
        {recentOrgs && recentOrgs.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-[1170px] mx-auto px-6">
              <div className="flex justify-between items-center mb-8 gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    องค์กรชั้นนำ
                  </h2>
                  <p className="text-gray-600 mt-2">
                    ค้นพบองค์กรเยาวชน ขับเคลื่อนโดยเยาวชน เพื่อสังคม
                  </p>
                </div>
                <Link
                  href="/orgs"
                  className="text-orange-dark hover:text-orange-normal flex items-center gap-1 font-medium shrink-0 group"
                >
                  ดูทั้งหมด
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                </Link>
              </div>

              <OrgCarousel orgs={recentOrgs} locale={params.locale} />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
