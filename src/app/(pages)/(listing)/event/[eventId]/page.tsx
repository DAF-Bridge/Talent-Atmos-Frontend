import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

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
    tickets: Array<{ name: string; price: number }>;
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

// Fetch event data directly within the server component
const fetchEventData = async (
  eventId: string
): Promise<EventDescriptionProps> => {
  const res = await fetch(`http://localhost:3000/api/events/${eventId}`, {
    cache: "no-cache",
  });
  const data: EventDescriptionProps = await res.json();
  return data;
};

export default async function EventDescription({
  params,
}: {
  params: { eventId: string }; // Accept event ID from URL params
}) {
  const { eventId } = params;

  // Fetch the event data directly in the component
  const data = await fetchEventData(eventId);

  if (!data) {
    return <div>Event not found</div>;
  }

  const imgUrl =
    "https://drive.google.com/uc?export=view&id=1-wqxOT_uo1pE_mEPHbJVoirMMH2Be3Ks";

  return (
    <section className="font-prompt relative h-full w-full">
      <div className="relative flex justify-center items-center h-[425px]">
        <Image
          className="absolute blur-md opacity-45 h-full w-full object-cover duration-100 -z-10"
          src={imgUrl}
          width={100}
          height={150}
          alt="อีเว้นท์"
        />
        <div className="flex justify-center items-center h-full lg:w-[90%] xl:w-[80%] mx-auto px-10 py-4">
          <div className="flex flex-col gap-3 justify-center  h-full rounded-l-[10px] px-5 md:bg-white">
            <div className="flex justify-start items-center gap-2">
              <div
                className="inline-flex h-auto max-w-[40px] overflow-hidden rounded-full bg-white"
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
      <div className="lg:w-[90%] xl:w-[80%] mx-auto px-10">
        <p className="font-semibold text-2xl mt-[32px]">รายละเอียด</p>
        <div className="border w-full mt-[8px] mb-[16px]" />
        <div className="flex flex-col gap-[4%] md:flex-row justify-between border">
          <div className="flex flex-col gap-[30px] border">
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
                <Accordion
                  type="single"
                  collapsible
                  className="w-full border rounded-[10px] bg-[#F4F4F5] px-5"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger>{"13 ก.ค. 2567"}</AccordionTrigger>
                    <AccordionContent>
                      {"Yes. It adheres to the WAI-ARIA design pattern."}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>{"24 ก.ค. 2567"}</AccordionTrigger>
                    <AccordionContent>
                      {
                        "Yes. It comes with default styles that matches the other components&apos; aesthetic."
                      }
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>{"7 ส.ค. 2567"}</AccordionTrigger>
                    <AccordionContent>
                      {
                        "Yes. It&apos;s animated by default, but you can disable it if you prefer."
                      }
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <p className="font-semibold text-2xl mt-[16px]">สถานที่</p>
              <p className="text-base font-normal">
                {"Builds - CMU: Startup & Entrepreneurial Platform"}
              </p>
              <div
                className="w-[80%] rounded-[10px] bg-slate-500"
                style={{ aspectRatio: "519 / 365" }}
              ></div>
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
          <div className="shrink-0 md:w-[35%] border">
            <div className="flex flex-col justify-center items-center w-full h-auto py-[15px] px-[5%] border rounded-[10px]">
              <button
                className="flex gap-[10px] w-full border border-black px-[5%] py-[10px] 
              rounded-[10px] hover:shadow-md hover:border-black/50 hover:scale-[1.01] 
              transition-all duration-100"
              >
                <div className="flex flex-col w-full text-left">
                  <p>{data.event.tickets[0].name}</p>
                  <p>{data.event.tickets[0].price}</p>
                </div>
              </button>
              <button className="w-full mt-6 py-2 text-white bg-orange-dark rounded-md hover:bg-orange-normal">
                ลงทะเบียนกิจกรรม
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// interface EventTicketProps {
//   name: string;
//   price: string;
// }

// function EventTicket({ name, price }: EventTicketProps) {
//   return (
//     <div className="flex justify-between gap-[10px] w-full border border-black px-[5%] py-[10px] rounded-[10px]">
//       <div className="flex flex-col w-full border">
//         <p>{name}</p>
//         <p>{price}</p>
//       </div>
//     </div>
//   );
// }

// interface TimelineAccordionProps {
//   timelineArr: Array<{
//     date: string;
//     content: string;
//   }>;
// }

// function TimelineAccordion({ timelineArr }: TimelineAccordionProps) {
//   return (
//     <Accordion
//       type="single"
//       collapsible
//       className="w-full border rounded-[10px] bg-[#F4F4F5] px-5"
//     >
//       {timelineArr.map((day, index) => (
//         <AccordionItem key={index} value="item-1">
//           <AccordionTrigger>{day.date}</AccordionTrigger>
//           <AccordionContent>{day.content}</AccordionContent>
//         </AccordionItem>
//       ))}
//     </Accordion>
//   );
// }

function getDate(dateString: string) {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Get the day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString("th-TH", { month: "short" }); // Gets the short month name (e.g., "Jan", "Feb")
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}
