import Badge from "@/components/cards/Badge";
import StaticMap from "@/components/ui/StaticMap";
import React, { Suspense } from "react";
import GalleryCarousel from "../Gallery";
import Spinner from "@/components/ui/spinner";

export default function OrgDescriptionPage() {
  const mockGallery = [
    "https://drive.google.com/uc?export=view&id=1mzjpHi5GHFrUEEmI_EVLfQE9ht2--ILd",

    "https://drive.google.com/uc?export=view&id=1bsT5WNkFnhhGT7SD3AynO9gqDjzz17lc",

    "https://drive.google.com/uc?export=view&id=1ZR2xgI4izSkZ4fEGEOr54fxDh7t2R-Uf",

    "https://drive.google.com/uc?export=view&id=1D9ldIaOqNZVaGemuZiKPbHHZOgAv46S9",

    "https://drive.google.com/uc?export=view&id=1UqwGnXRwvZOXfOVAmVKa8oAlzcRzPXMq",

    "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  ];
  return (
    <Suspense fallback={<Spinner />}>
      <div className="flex flex-col gap-[60px]">
        <div className="flex flex-col gap-2">
          <p className="text-lg sm:text-xl font-semibold">ข้อมูลทั่วไป</p>
          <div className="flex gap-6 mt-2 leading-loose">
            <p className="text-left shrink-0 text-sm sm:text-base">
              ประเภทธุรกิจ :
            </p>
            <div className="flex flex-wrap justify-start items-center gap-2">
              <Badge label="บริษัท" className="bg-orange-normal" />
              <Badge label="บริษัท" className="bg-orange-normal" />
              <Badge label="บริษัท" className="bg-orange-normal" />
              <Badge label="บริษัท" className="bg-orange-normal" />
            </div>
          </div>
          <div className="flex gap-6 mt-1">
            <p className="text-left shrink-0 text-sm sm:text-base">
              ความชำนาญ :
            </p>
            <p className="text-left text-sm sm:text-base font-normal">
              พัฒนาโครงการสตาร์ทอัพและการเป็นผู้ประกอบการ
            </p>
          </div>
          <p className="mt-2 text-sm sm:text-base leading-loose">
            โครงการสร้างสตาร์ทอัพและการเป็นผู้ประกอบการของมหาวิทยาลัยเชียงใหม่เป็นโปรแกรมที่มุ่งเน้นการพัฒนานักศึกษาและบุคคลทั่วไปที่มีความสนใจในการเริ่มต้นธุรกิจ
            และการเป็นผู้ประกอบการ โดยมีเป้าหมายเพื่อสร้างพื้นฐานความรู้ ทักษะ
            และเครือข่ายที่จำเป็นสำหรับการเริ่มต้นและบริหารจัดการสตาร์ทอัพอย่างมีประสิทธิภาพ
          </p>
        </div>

        <div className="flex gap-6">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-6">
            <div className="flex flex-col gap-[60px]">
              <div className="flex flex-col gap-3">
                <p className="text-lg sm:text-xl font-semibold">
                  ข้อมูลการติดต่อ
                </p>
                <div className="grid grid-cols-4">
                  <p className="text-left shrink-0 text-sm sm:text-base">
                    ที่ตั้ง :
                  </p>
                  <p className="text-sm sm:text-base font-normal col-span-3">
                    builds Space CMU ซอย เขลางค์ 4 ตำบลสุเทพ อำเภอเมืองเชียงใหม่
                    เชียงใหม่ 50200 เทศบาลนครเชียงใหม่, จังหวัดเชียงใหม่ 50200
                  </p>
                </div>
                <div className="grid grid-cols-4">
                  <p className="text-left shrink-0 text-sm sm:text-base">
                    อีเมล :
                  </p>
                  <p className="text-sm sm:text-base font-normal col-span-3">
                    builds@cmu.ac.th
                  </p>
                </div>
                <div className="grid grid-cols-4">
                  <p className="text-left shrink-0 text-sm sm:text-base">
                    เบอร์โทรศัพท์ :
                  </p>
                  <p className="text-sm sm:text-base font-normal col-span-3">
                    081-123-4567
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-lg sm:text-xl font-semibold ">
                  ช่องทางอื่นๆ
                </p>
                <div className="grid grid-cols-4">
                  <p className="text-left shrink-0 text-sm sm:text-base">
                    เว็บไซต์ :
                  </p>
                  <p className="text-sm sm:text-base font-normal col-span-3">
                    buildscmu.com
                  </p>
                </div>
                <div className="grid grid-cols-4">
                  <p className="text-left shrink-0 text-sm sm:text-base">
                    เฟสบุ้ค :
                  </p>
                  <p className="text-sm sm:text-base font-normal col-span-3">
                    builds - CMU Startup & Entrepreneurial Program 
                  </p>
                </div>
                <div className="grid grid-cols-4">
                  <p className="text-left shrink-0 text-sm sm:text-base">
                    อินสตาแกรม :
                  </p>
                  <p className="text-sm sm:text-base font-normal col-span-3">
                    builds CMU
                  </p>
                </div>
              </div>
            </div>
            <div
              className="rounded-[10px] col-span-2 h-[300px] lg:h-[365px] bg-slate-200 
          w-full max-w-[520px] overflow-hidden drop"
            >
              <StaticMap lat={18.80207753602652} lng={98.96766808636778} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-lg sm:text-xl font-semibold">แกลลอรี่องค์กร</p>
          <GalleryCarousel gallery={mockGallery} />
        </div>
      </div>
    </Suspense>
  );
}
