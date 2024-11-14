import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function EventDescription() {
  const imgUrl =
    "https://drive.google.com/uc?export=view&id=1-wqxOT_uo1pE_mEPHbJVoirMMH2Be3Ks";
  return (
    <section className="font-prompt relative h-full w-full">
      <div className="relative flex justify-center items-center h-[425px] bg-slate-400">
        <Image
          className="absolute blur-md opacity-45 h-full w-full object-cover duration-100 -z-10"
          src={imgUrl}
          width={100}
          height={150}
          alt="อีเว้นท์"
        />
        <div className="flex justify-center items-center h-full  lg:w-[90%] xl:w-[80%] mx-auto px-10 py-4 border">
          <div className="flex flex-col gap-3 justify-center  h-full border rounded-l-[10px]">
            <div className="flex justify-start items-center gap-2 border">
              <div
                className="inline-flex h-auto max-w-[40px] overflow-hidden rounded-full bg-white border"
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
              <p className="truncate">Builds มหาวิทยาลัยเชียงใหม่</p>
            </div>
            <p className="font-medium text-5xl line-clamp-1 border">
              Builds Idea 2024
            </p>
            <div className="inline-flex flex-col justify-start items-start gap-4 ">
              <div className="flex justify-start items-center flex-row gap-3">
                <Calendar className="shrink-0 text-orange-dark h-[20px] w-[20px]" />
                <p className="line-clamp-1 font-normal text-lg border">
                  13 กรกฎาคม - 07 สิงหาคม 2567
                </p>
              </div>
              <div className="inline-flex justify-start items-center flex-row gap-3">
                <Clock className="shrink-0 text-orange-dark h-[20px] w-[20px]" />
                <p className="line-clamp-1 font-normal text-lg border">
                  09:00 - 20:00 (UTC+7)
                </p>
              </div>
              <div className="inline-flex justify-start items-center flex-row gap-3">
                <MapPin className="shrink-0 text-orange-dark h-[20px] w-[20px]" />
                <p className="line-clamp-1 font-normal text-lg border">
                  ศูนย์สุขภาพพร้อม สาขาอาคารศูนย์สุขภาพ มหาวิทยาลัยเชียงใหม่
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
    </section>
  );
}
