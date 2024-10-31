import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HomeTrendingEvent() {
  return (
    <div className="flex flex-col gap-5 sm:flex-row lg:gap-16 mt-5 group">
      <div
        className="
          relative w-auto lg:w-[404px] h-[294px] m-h-[294px] flex-shrink-0 
          group-hover:shadow-md rounded-[10px] overflow-hidden duration-100 bg-[#F5C618]     
      "
      >
        <Link href={"/event"}>
          <Image
            className="
            flex h-[294px] w-full object-contain 
            group-hover:scale-105  group-hover:cursor-pointer duration-100"
            src={"/event-test.png"}
            width={404}
            height={294}
            alt="อีเว้นท์มาแรง"
          />
        </Link>
      </div>
      <div className="flex flex-col flex-grow gap-2">
        <Link
          href={"/event"}
          className="font-semibold text-[26px] line-clamp-1 hover:text-orange-normal hover:cursor-pointer duration-100"
        >
          Builds Idea 2024
        </Link>
        <div className="line-clamp-5">
          อยากเป็นผู้ประกอบการ แต่ไม่รู้ว่าไอเดียที่มี จะเป็นไปได้ไหม?
          โครงการสำหรับการผู้ที่สนใจทำธุรกิจ มาเริ่มคิดค้นไอเดีย
          และเรียนรู้เครื่องมือพิสูจน์ไอเดียไปด้วยกัน!
          เริ่มต้นเรียนคอร์สออนไลน์จากตลาดหลักทรัพย์แห่งประเทศไทย และร่วมกิจกรรม
          Workshop แบบออนไซต์เพื่อเพิ่มทักษะผู้ประกอบการ!
          เริ่มต้นเรียนคอร์สออนไลน์จากตลาดหลักทรัพย์แห่งประเทศไทย และร่วมกิจกรรม
          Workshop แบบออนไซต์เพื่อเพิ่มทักษะผู้ประกอบการ!
          เริ่มต้นเรียนคอร์สออนไลน์จากตลาดหลักทรัพย์แห่งประเทศไทย และร่วมกิจกรรม
          Workshop แบบออนไซต์เพื่อเพิ่มทักษะผู้ประกอบการ!
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <Image src={"icon/calendar.svg"} width={26} height={26} alt="" />
            <div className="line-clamp-1 ">13 ก.ค. - 07 ส.ค. 2567</div>
          </div>
          <div className="flex flex-row gap-4">
            <Image src={"icon/time.svg"} width={26} height={26} alt="" />
            <div className="line-clamp-1 ">09:00 - 18:00 (UTC+7)</div>
          </div>
          <div className="flex flex-row gap-4">
            <Image src={"icon/location.svg"} width={26} height={26} alt="" />
            <div className="line-clamp-1 ">
              ศูนย์สุขภาพพร้อม สาขาอาคารศูนย์สุขภาพ มหาวิทยาลัยเชียงใหม่
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
