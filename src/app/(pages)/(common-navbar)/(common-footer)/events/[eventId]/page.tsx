import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StaticMap from "@/components/ui/StaticMap";
import {
  formatDateRange,
  formatInternalUrl,
  formatTimeRange,
} from "@/lib/utils";
import {
  IoCalendarSharp,
  IoLocationSharp,
  IoTimeOutline,
} from "react-icons/io5";
import Image from "next/image";
import React from "react";
import RegBtn from "./regBtn";
import { notFound } from "next/navigation";
import { EventDescriptionProps } from "@/lib/types";

export default async function EventDescription({
  params,
}: Readonly<{
  params: { eventId: string }; // Accept event ID from URL params
}>) {
  const { eventId } = params;

  const apiUrl = formatInternalUrl("/api/events/" + eventId);
  const res = await fetch(apiUrl, {
    cache: "no-cache",
  });

  if (!res.ok) {
    notFound();
  }

  const data: EventDescriptionProps = await res.json();

  const {
    // id,
    name,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    // price,
    picUrl,
    highlight,
    benefits,
    requirements,
    // outcomes,
    timeline,
    location,
    contact,
    regLink,
  } = data.event;

  return (
    <section className="font-prompt relative h-full w-full mt-[60px]">
      <div className="relative flex justify-center items-center h-[425px]">
        <Image
          className="absolute blur-md opacity-45 h-full w-full object-cover duration-100 -z-10"
          src={picUrl}
          width={100}
          height={150}
          alt="event-blur"
        />
        {/* Tablet and PC Poster */}
        <div className="flex justify-center items-center h-full lg:w-[90%] xl:w-[80%] mx-auto px-4 py-4 drop-shadow-lg">
          <div className="hidden md:flex flex-col gap-3 justify-center  h-full md:max-w-[50%] rounded-l-[10px] px-3 md:px-6 lg:px-10 md:bg-white">
            <div className="flex justify-start items-center gap-2">
              <div
                className="inline-flex h-auto max-w-[40px] overflow-hidden rounded-full"
                style={{ aspectRatio: "1 / 1" }}
              >
                <Image
                  className="shrink-0 h-full w-full object-cover"
                  src={data.organization.picUrl}
                  width={60}
                  height={60}
                  alt="org-profile"
                />
              </div>
              <p className="truncate">{data.organization.name}</p>
            </div>
            <p className="font-medium text-2xl lg:text-3xl line-clamp-1">
              {name}
            </p>
            <div className="inline-flex flex-col justify-start items-start gap-4 ">
              <div className="flex justify-start items-center flex-row gap-3">
                <IoCalendarSharp className="shrink-0 text-orange-dark text-lg" />
                <p className="line-clamp-2 font-normal sm:text-base md:text-lg">
                  {startDate ? formatDateRange(startDate, endDate) : "ไม่ระบุ"}
                </p>
              </div>
              <div className="inline-flex justify-start items-center flex-row gap-3">
                <IoTimeOutline className="shrink-0 text-orange-dark text-lg" />
                <p className="line-clamp-2 font-normal sm:text-base md:text-lg">
                  {startTime ? formatTimeRange(startTime, endTime) : "ไม่ระบุ"}
                </p>
              </div>
              <div className="inline-flex justify-start items-center flex-row gap-3">
                <IoLocationSharp className="shrink-0 text-orange-dark text-lg" />
                <p className="line-clamp-2 font-normal sm:text-base md:text-lg">
                  {location.name !== "" ? location.name : "ไม่ระบุ"}
                </p>
              </div>
            </div>
          </div>
          <div className="shrink-0 h-full md:rounded-r-[10px] overflow-hidden">
            <div className="h-full rounded-[5px] md:rounded-none drop-shadow-md md:drop-shadow-none overflow-hidden ">
              <Image
                className="object-cover h-full w-auto"
                src={picUrl}
                width={300}
                height={500}
                alt="อีเว้นท์"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Event Poster */}
      <div className="md:hidden w-full mt-[15px]">
        <div
          className="flex flex-col gap-3 justify-center items-center  h-full md:max-w-[50%] 
        rounded-l-[10px] px-3 md:px-6 lg:px-10 md:bg-white"
        >
          <div className="flex justify-start items-center gap-2">
            <div
              className="inline-flex h-auto max-w-[40px] overflow-hidden rounded-full"
              style={{ aspectRatio: "1 / 1" }}
            >
              <Image
                className="shrink-0 h-[35px] w-full object-cover"
                src={data.organization.picUrl}
                width={60}
                height={60}
                alt="org-profile"
              />
            </div>
            <p className="text-sm truncate">{data.organization.name}</p>
          </div>
          <p className="font-medium text-lg line-clamp-1">
            {name}
          </p>
          <div className="inline-flex flex-col justify-start items-center gap-2 ">
            <div className="flex justify-start items-center flex-row gap-3">
              <IoCalendarSharp className="shrink-0 text-orange-dark text-base" />
              <p className="line-clamp-2 font-normal text-sm">
                {startDate ? formatDateRange(startDate, endDate) : "ไม่ระบุ"}
              </p>
            </div>
            <div className="inline-flex justify-start items-center flex-row gap-3">
              <IoTimeOutline className="shrink-0 text-orange-dark text-lg" />
              <p className="line-clamp-2 font-normal text-sm">
                {startTime ? formatTimeRange(startTime, endTime) : "ไม่ระบุ"}
              </p>
            </div>
            <div className="inline-flex justify-start items-center flex-row gap-3">
              <IoLocationSharp className="shrink-0 text-orange-dark text-lg" />
              <p className="line-clamp-2 font-normal text-sm">
                {location.name !== "" ? location.name : "ไม่ระบุ"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-[90%] xl:w-[80%] mx-auto px-3 md:px-10 lg:px-14">
        <p className="font-semibold text-xl md:text-2xl mt-[32px]">รายละเอียด</p>
        <div className="border w-full mt-[8px] mb-[16px]" />
        <div className="flex flex-col gap-[32px] md:gap-[4%] md:flex-row justify-between">
          <div className="flex flex-col gap-[30px]">
            {description && (
              <div className="flex flex-col gap-[10px]">
                <p className="font-semibold text-xl md:text-2xl">คำอธิบายกิจกรรม</p>
                <pre className="font-prompt text-base font-normal whitespace-pre-wrap break-words">
                  {description}
                </pre>
              </div>
            )}
            {highlight && (
              <div className="flex flex-col gap-[10px]">
                <p className="font-semibold text-xl md:text-2xl mt-[16px]">
                  ไฮไลท์ของกิจกรรม
                </p>
                <p className="text-base font-normal">{highlight}</p>
              </div>
            )}
            {requirements && (
              <div className="flex flex-col gap-[10px]">
                <p className="font-semibold text-xl md:text-2xl mt-[16px]">
                  คุณสมบัติผู้สมัคร
                </p>
                <p className="text-base font-normal">{requirements}</p>
              </div>
            )}
            {benefits && (
              <div className="flex flex-col gap-[10px]">
                <p className="font-semibold text-xl md:text-2xl mt-[16px]">
                  สิ่งที่จะได้รับ
                </p>
                <ul className="list-disc pl-6">
                  {benefits.map((item, index) => (
                    <li key={index} className="text-base font-normal">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {timeline.length > 0 && (
              <div className="flex flex-col gap-[10px]">
                <p className="font-semibold text-xl md:text-2xl mt-[16px]">
                  ไทม์ไลน์และกำหนดการ
                </p>
                <div className="w-[90%]">
                  <TimelineAccordion timelineArr={timeline} />
                </div>
              </div>
            )}
            {location.name && (
              <div className="flex flex-col gap-[10px]">
                <p className="font-semibold text-xl md:text-2xl mt-[16px]">สถานที่</p>
                <p className="text-base font-normal">
                  {location.name ?? "ไม่ระบุ"}
                </p>
                <div
                  className="w-full md:w-[80%] rounded-[10px] max-w-[519px] bg-slate-500 overflow-hidden"
                  style={{ aspectRatio: "519 / 365" }}
                >
                  {location.lat !== null && location.lng !== null && (
                    <StaticMap lat={location.lat} lng={location.lng} />
                  )}
                </div>
              </div>
            )}
            {contact.length > 0 && (
              <div className="flex flex-col gap-[10px]">
                <p className="font-semibold text-xl md:text-2xl mt-[16px]">
                  ช่องทางติดต่อสอบถาม
                </p>
                {contact.map((item, index) => (
                  <p
                    key={index}
                    className="grid grid-cols-10 text-base font-normal"
                  >
                    <span className="col-span-3 md:col-span-2">
                      {item.type}:
                    </span>
                    {item.url.includes("http") ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="col-span-7 md:col-span-8 underline hover:text-gray-inactive break-words whitespace-normal"
                      >
                        {item.url}
                      </a>
                    ) : (
                      <span className="col-span-7 md:col-span-8 break-words whitespace-normal">
                        {item.url}
                      </span>
                    )}
                  </p>
                ))}
              </div>
            )}
          </div>
          {regLink && (
            <div className="shrink-0 md:w-[35%]">
              <div
                className="md:sticky top-[80px] flex flex-col justify-center items-center gap-4 
            w-full h-auto pt-[20px] pb-[30px] px-[5%] border rounded-[10px] drop-shadow-lg bg-white"
              >
                <p className="text-left text-xl font-medium w-full">
                  ลงทะเบียน
                </p>
                <div className="flex flex-col gap-5 w-full">
                  <RegBtn url={regLink} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

interface TimelineAccordionProps {
  timelineArr: Array<{
    date: string;
    content: string;
  }>;
}

function TimelineAccordion({ timelineArr }: Readonly<TimelineAccordionProps>) {
  if (timelineArr.length === 0) return;
  return (
    <Accordion
      type="multiple"
      className="w-full border rounded-[10px] bg-[#F4F4F5] px-5"
    >
      {timelineArr.map((day, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{day.date}</AccordionTrigger>
          <AccordionContent>{day.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
