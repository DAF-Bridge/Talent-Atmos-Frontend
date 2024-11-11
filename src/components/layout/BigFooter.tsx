import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

// const eventPath = [
//   { label: "ธุรกิจ & เศรษฐกิจ", href: "/event/econ" },
//   { label: "สิ่งแวดล้อม", href: "/event/envi" },
//   { label: "พัฒนาสัมคม", href: "/event/soc" },
// ];

// const orgPath = [
//   { label: "องค์กรด้านเศรษฐกิจ", href: "/org/econ" },
//   { label: "องค์กรด้านสิ่งแวดล้อม", href: "/org/envi" },
//   { label: "องค์กรด้านสัมคม", href: "/org/soc" },
// ];

export default function BigFooter() {
  return (
    <div className="bg-[#1D1D1D] py-11 font-prompt rounded-t-[20px] mt-auto">
      <div className="flex flex-wrap gap-10 lg:justify-between max-w-[1170px] mx-auto px-6 ">
        <div className="flex flex-col gap-[21px]">
          {/* Logo */}
          <div className="flex max-h-[80px] justify-start items-center">
            <Link href="/">
              <Image
                className="max-h-[80px] w-auto object-cover"
                src="/logo-white.svg"
                alt="Logo"
                width={500}
                height={500}
              />
            </Link>
          </div>
          <div className="text-white font-normal text-base max-w-[393px]">
            เลขที่ 239 ถนนห้วยแก้ว ตำบลสุเทพ อำเภอเมืองเชียงใหม่
            จังหวัดเชียงใหม่ 50200
          </div>
        </div>
        <div className="flex flex-col gap-7 text-white font-normal text-base ">
          {/* <div className="flex flex-col gap-3">
            <div className="text-orange-normal font-medium text-xl">
              อีเว้นท์
            </div>
            <div className="pl-5 flex flex-col gap-5">
              {eventPath.map(({ label, href }, key) => (
                <Link
                  className="text-white font-normal text-sm hover:text-gray-300"
                  href={href}
                  key={key}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div> */}
          {/* <div className="flex flex-col gap-3">
            <div className="text-orange-normal font-medium text-xl">องค์กร</div>
            <div className="pl-5 flex flex-col gap-5">
              {orgPath.map(({ label, href }, key) => (
                <Link
                  className="text-white font-normal text-sm hover:text-gray-300"
                  href={href}
                  key={key}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div> */}
          {/* <Link
            href={"/org/join"}
            className="text-white font-medium text-base hover:text-gray-300"
          >
            เข้าร่วมเป็นองค์กรพันธมิตร
          </Link> */}
        </div>
        <div className="text-white font-normal text-base flex flex-col gap-10 items-end">
          <div className="w-full">
            <div className="text-orange-normal font-medium text-xl ">
              ช่องทางติดต่อ
            </div>
            <div className="flex gap-6 justify-start items-center h-7 mt-6 ">
              <Link
                className="h-full w-auto"
                href={"fb"}
              >
                <FaFacebook
                  className="h-full w-auto hover:text-gray-300 "
                  width={50}
                  height={50}
                />
              </Link>
              <Link
                className="h-full w-auto"
                href={"ig"}
              >
                <FaInstagram
                  className="h-full w-auto hover:text-gray-300"
                  width={50}
                  height={50}
                />
              </Link>

              <Link
                className="h-full w-auto"
                href={"yt"}
              >
                <FaYoutube
                  className="h-full w-auto hover:text-gray-300"
                  width={50}
                  height={50}
                />
              </Link>
            </div>
          </div>
          <div className="text-white font-normal text-base w-full">
            Email : seabridgetalents.info@gmail.com
          </div>
          <div className="text-white font-normal text-base w-full">
            โทรศัพท์ : +66 12 345 6789
          </div>
        </div>
      </div>
    </div>
  );
}
