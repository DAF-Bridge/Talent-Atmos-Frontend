import React from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrgDescription from "./OrgDescription";
import OrgJobs from "./OrgJobs";
import OrgEvents from "./OrgEvents";

export default async function OrgDetailPage({
  params,
}: Readonly<{ params: { orgId: string } }>) {
  const { orgId } = params;
  return (
    <div className="max-w-[1170px] mx-auto px-6 mt-[90px] sm:mt-[77px] pb-16">
      <div className="relative">
        <div className="hidden sm:block w-full h-[150px] sm:h-[200px] rounded-[20px] overflow-hidden">
          <Image
            className="w-full h-full object-cover"
            src={
              "https://drive.google.com/uc?export=view&id=1qOsmXXIF7qUOzv9RKNxkZGdOSmpKymxL"
            }
            height={800}
            width={1000}
            alt={"organization-background-image"}
          />
        </div>
        <div className="relative sm:absolute -bottom-[90%] sm:-bottom-[50%] left-0 ">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 justify-center items-center">
            <div
              style={{ aspectRatio: "1 / 1" }}
              className="shrink-0 h-[100px] w-[100px] sm:h-[150px] sm:w-[150px] rounded-[20px] overflow-hidden drop-shadow-md"
            >
              <Image
                className="w-full h-full object-cover"
                src={
                  "https://drive.google.com/uc?export=view&id=1mzjpHi5GHFrUEEmI_EVLfQE9ht2--ILd"
                }
                height={500}
                width={500}
                alt={"organization-background-image"}
              />
            </div>
            <div className="flex flex-col sm:mt-11 text-center sm:text-left">
              <p className="text-lg sm:text-2xl font-medium line-clamp-1">
                builds มหาวิทยาลัยเชียงใหม่ {orgId}
              </p>
              <p className="text-sm sm:text-base font-light line-clamp-2">
                Startup & Entrepreneurial Program
                โปรแกรมการสร้างสตาร์ทอัพและผู้ประกอบการ มหาวิทยาลัยเชียงใหม่
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[10px] sm:mt-[120px] w-full">
        <Tabs defaultValue="about-org" className="w-full">
          <TabsList
            className="flex justify-center sm:justify-start px-0 w-full border-b 
          border-border h-12 bg-transparent space-x-8 rounded-none"
          >
            <TabsTrigger value="about-org" className={tabStyle}>
              เกี่ยวกับองค์กร
            </TabsTrigger>
            <TabsTrigger value="jobs-org" className={tabStyle}>
              รับสมัครงาน
            </TabsTrigger>
            <TabsTrigger value="event-org" className={tabStyle}>
              อีเว้นท์
            </TabsTrigger>
          </TabsList>
          <TabsContent value="about-org">
            <OrgDescription />
          </TabsContent>
          <TabsContent value="jobs-org">
            <OrgJobs />
          </TabsContent>
          <TabsContent value="event-org">
            <OrgEvents />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

const tabStyle = `text-sm sm:text-base font-normal text-black  data-[state=active]:shadow-none relative h-12 bg-transparent px-0
          after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:border-b-[3px] after:border-orange-dark after:content-[''] 
          after:opacity-0 after:transition-opacity data-[state=active]:text-orange-dark data-[state=active]:after:opacity-100`;
