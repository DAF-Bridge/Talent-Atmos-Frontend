import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export default function BigFooter() {
  return (
    <div className="bg-[#1D1D1D] py-11 font-prompt rounded-t-[20px] mt-[87px]">
      <div className="flex flex-wrap gap-10 lg:justify-between max-w-[1170px] mx-auto px-10">
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
        <div className="text-white font-normal text-base flex flex-col gap-10 items-end">
          <div className="w-full">
            <div className="text-orange-normal font-medium text-xl ">
              ช่องทางติดต่อ
            </div>
            <div className="flex gap-6 justify-start items-center h-7 mt-6 ">
              <Link className="h-full w-auto" href={"fb"}>
                <FaFacebook
                  className="h-full w-auto hover:text-gray-300 "
                  width={50}
                  height={50}
                />
              </Link>
              <Link className="h-full w-auto" href={"ig"}>
                <FaInstagram
                  className="h-full w-auto hover:text-gray-300"
                  width={50}
                  height={50}
                />
              </Link>

              <Link className="h-full w-auto" href={"yt"}>
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
