import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StaticMap from "@/components/ui/StaticMap";
import { formatInternalUrl } from "@/lib/utils";
import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import RegBtn from "./regBtn";
import { notFound } from "next/navigation";

interface EventDescriptionProps {
  event: {
    id: string;
    title: string;
    description: string;
    highlight: string;
    requirements: string;
    outcomes: Array<string>;
    timeline: Array<{ date: string; content: string }>;
    location: {
      name: string;
      map_url: string;
      image_url: string;
    };
    contact: {
      facebook: string;
    };
    regLink: string;
  };
  organizer: {
    name: string;
    profile_image: string;
  };
  event_dates: {
    start: string;
    end: string;
  };
}

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

  const imgUrl =
    "https://drive.google.com/uc?export=view&id=1-wqxOT_uo1pE_mEPHbJVoirMMH2Be3Ks";

  return (
    <section className="font-prompt relative h-full w-full mt-[60px]">
      <div className="relative flex justify-center items-center h-[425px]">
        <Image
          className="absolute blur-md opacity-45 h-full w-full object-cover duration-100 -z-10"
          src={imgUrl}
          width={100}
          height={150}
          alt="อีเว้นท์"
        />
        <div className="flex justify-center items-center h-full lg:w-[90%] xl:w-[80%] mx-auto px-4 py-4 drop-shadow-lg">
          <div className="flex flex-col gap-3 justify-center  h-full max-w-[50%] rounded-l-[10px] px-10 md:bg-white">
            <div className="flex justify-start items-center gap-2">
              <div
                className="inline-flex h-auto max-w-[40px] overflow-hidden rounded-full"
                style={{ aspectRatio: "1 / 1" }}
              >
                <Image
                  className="shrink-0 h-full w-full object-cover"
                  src={imgUrl}
                  width={60}
                  height={60}
                  alt="org-profile"
                />
              </div>
              <p className="truncate">{data.organizer.name}</p>
            </div>
            <p className="font-medium text-5xl line-clamp-1">
              {data.event.title}
            </p>
            <div className="inline-flex flex-col justify-start items-start gap-4 ">
              <div className="flex justify-start items-center flex-row gap-3">
                <Calendar className="shrink-0 text-orange-dark h-[20px] w-[20px]" />
                <p className="line-clamp-1 font-normal text-lg">
                  {`${getDate(data.event_dates.start)} - ${getDate(
                    data.event_dates.end
                  )}`}
                </p>
              </div>
              <div className="inline-flex justify-start items-center flex-row gap-3">
                <Clock className="shrink-0 text-orange-dark h-[20px] w-[20px]" />
                <p className="line-clamp-1 font-normal text-lg">
                  09:00 - 20:00 (UTC+7)
                </p>
              </div>
              <div className="inline-flex justify-start items-center flex-row gap-3">
                <MapPin className="shrink-0 text-orange-dark h-[20px] w-[20px]" />
                <p className="line-clamp-1 font-normal text-lg">
                  {data.event.location.name}
                </p>
              </div>
            </div>
          </div>
          <div className="shrink-0 h-full -2">
            <div className="h-full rounded-r-[10px] overflow-hidden ">
              <Image
                className="object-cover hidden md:block  h-full w-auto"
                src={imgUrl}
                width={300}
                height={500}
                alt="อีเว้นท์"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-[90%] xl:w-[80%] mx-auto px-14">
        <p className="font-semibold text-2xl mt-[32px]">รายละเอียด</p>
        <div className="border w-full mt-[8px] mb-[16px]" />
        <div className="flex flex-col gap-[32px] md:gap-[4%] md:flex-row justify-between">
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[10px]">
              <p className="font-semibold text-2xl">คำอธิบายกิจกรรม</p>
              <pre className="font-prompt text-base font-normal whitespace-pre-wrap break-words">
                {data.event.description}
              </pre>
            </div>
            <div className="flex flex-col gap-[10px]">
              <p className="font-semibold text-2xl mt-[16px]">
                ไฮไลท์ของกิจกรรม
              </p>
              <p className="text-base font-normal">{data.event.highlight}</p>
            </div>
            <div className="flex flex-col gap-[10px]">
              <p className="font-semibold text-2xl mt-[16px]">
                คุณสมบัติผู้สมัคร
              </p>
              <p className="text-base font-normal">{data.event.requirements}</p>
            </div>
            <div className="flex flex-col gap-[10px]">
              <p className="font-semibold text-2xl mt-[16px]">
                สิ่งที่จะได้รับ
              </p>
              <ul className="list-disc pl-6">
                <li className="text-base font-normal">
                  {
                    "การทำ Design Thinking เพื่อสำรวจและออกแบบผลิตภัณฑ์ให้ตอบโจทย์ลูกค้า"
                  }
                </li>
                <li className="text-base font-normal">
                  {
                    "การออกแบบธุรกิจด้วยเครื่องมือต่างๆ เช่น Business Model Canvas"
                  }
                </li>
                <li className="text-base font-normal">
                  {"ทักษะการพิชชิ่งต่ิหน้ากรรมการ"}
                </li>
                <li className="text-base font-normal">
                  {"ทักษะด้านทีมเวิร์ค"}
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-[10px]">
              <p className="font-semibold text-2xl mt-[16px]">
                ไทม์ไลน์และกำหนดการ
              </p>
              <div className="w-[90%]">
                <TimelineAccordion timelineArr={data.event.timeline} />
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <p className="font-semibold text-2xl mt-[16px]">สถานที่</p>
              <p className="text-base font-normal">
                {"Builds - CMU: Startup & Entrepreneurial Platform"}
              </p>
              <div
                className="w-[80%] rounded-[10px] bg-slate-500 overflow-hidden"
                style={{ aspectRatio: "519 / 365" }}
              >
                <StaticMap lat={18.80207753602652} lng={98.96766808636778} />
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <p className="font-semibold text-2xl mt-[16px]">
                ช่องทางติดต่อสอบถาม
              </p>
              <p className="text-base font-normal">
                {data.event.contact.facebook}
              </p>
            </div>
          </div>
          <div className="shrink-0 md:w-[35%]">
            <div
              className="md:sticky top-[80px] flex flex-col justify-center items-center gap-4 
            w-full h-auto pt-[20px] pb-[30px] px-[5%] border rounded-[10px] drop-shadow-lg bg-white"
            >
              <p className="text-left text-xl font-medium w-full">ลงทะเบียน</p>
              <div className="flex flex-col gap-5 w-full">
                <RegBtn url={data.event.regLink} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// interface EventTicketProps {
//   name: string;
//   price: number;
//   id: string;
// }

// function EventTicket({ name, price, id }: Readonly<EventTicketProps>) {
//   return (
//     <Link
//       href={`/event/${id}`}
//       className="relative group font-thin text-xl w-full hover:scale-[1.04]
//   active:scale-95 transition-all duration-150"
//     >
//       <div
//         className="absolute inset-x-0 h-full -bottom-[5px] bg-black border border-black
//     rounded-[25px] group-hover:bg-black group-hover:border-black"
//       />

//       <div
//         className="relative bg-white group-hover:bg-slate-100 border-2 border-black
//     group-hover:border-black rounded-[25px] py-[20px] px-[6%] w-full  "
//       >
//         <div className="flex justify-between items-center pr-2  w-full text-left font-medium">
//           <p className="text-lg font-semibold">{"แบบ " + name}</p>
//           <p className="text-xl font-medium">
//             {price > 0 ? price.toLocaleString() + " ฿" : "Free!"}
//           </p>
//         </div>
//       </div>
//     </Link>
//   );
// }

interface TimelineAccordionProps {
  timelineArr: Array<{
    date: string;
    content: string;
  }>;
}

function TimelineAccordion({ timelineArr }: Readonly<TimelineAccordionProps>) {
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

function getDate(dateString: string) {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Get the day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString("th-TH", { month: "short" }); // Gets the short month name (e.g., "Jan", "Feb")
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}
