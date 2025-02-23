import Badge from "@/components/common/Badge";
import StaticMap from "@/components/ui/StaticMap";
import React, { Suspense } from "react";
import Spinner from "@/components/ui/spinner";
import { formatInternalUrl } from "@/lib/utils";
import { notFound } from "next/navigation";
import GalleryCarousel from "@/features/orgs/components/Gallery";
import { OrganizationDescription } from "@/lib/types";
import Link from "next/link";

export default async function OrgDescriptionPage({
  params,
}: Readonly<{
  params: { orgId: string }; // Accept event ID from URL params
}>) {
  const { orgId } = params;
  const apiUrl = formatInternalUrl("/api/org/" + orgId);
  const res = await fetch(apiUrl, {
    cache: "no-cache",
  });

  if (!res.ok) {
    notFound();
  }

  const orgData: OrganizationDescription = await res.json();
  const {
    industries,
    specialty,
    description,
    address,
    email,
    phone,
    website,
    facebook,
    instagram,
    latitude,
    longitude,
    gallery,
  } = orgData;

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
              {industries.map((type: string, index: number) => (
                <Badge key={index} label={type} className="bg-orange-normal" />
              ))}
            </div>
          </div>
          <div className="flex gap-6 mt-1">
            <p className="text-left shrink-0 text-sm sm:text-base">
              ความชำนาญ :
            </p>
            <p className="text-left text-sm sm:text-base font-normal">
              {specialty}
            </p>
          </div>
          <pre className="mt-4 font-prompt text-base font-normal whitespace-pre-wrap break-words">
            {description}
          </pre>
        </div>

        <div className="flex gap-6">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-6 w-full">
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
                    {address}
                  </p>
                </div>
                <div className="grid grid-cols-4">
                  <p className="text-left shrink-0 text-sm sm:text-base">
                    อีเมล :
                  </p>
                  <p className="text-sm sm:text-base font-normal col-span-3">
                    {email}
                  </p>
                </div>
                <div className="grid grid-cols-4">
                  <p className="text-left shrink-0 text-sm sm:text-base">
                    เบอร์โทรศัพท์ :
                  </p>
                  <p className="text-sm sm:text-base font-normal col-span-3">
                    {phone}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-lg sm:text-xl font-semibold">ช่องทางอื่นๆ</p>
                <div className="grid grid-cols-4">
                  <p className="text-left shrink-0 text-sm sm:text-base">
                    เว็บไซต์ :
                  </p>
                  {
                    // if start with https use <a> else use <p>
                    website.startsWith("https://") ? (
                      <Link
                        href={website}
                        className="text-sm sm:text-base font-normal col-span-3 underline text-blue-600"
                      >
                        {website}
                      </Link>
                    ) : (
                      <p className="text-sm sm:text-base font-normal col-span-3">
                        {website}
                      </p>
                    )
                  }
                </div>
                <div className="grid grid-cols-4">
                  <p className="text-left shrink-0 text-sm sm:text-base">
                    เฟสบุ้ค :
                  </p>
                  {
                    // if start with https use <a> else use <p>
                    facebook.startsWith("https://") ? (
                      <Link
                        href={facebook}
                        className="text-sm sm:text-base font-normal col-span-3 underline text-blue-600"
                      >
                        {facebook}
                      </Link>
                    ) : (
                      <p className="text-sm sm:text-base font-normal col-span-3">
                        {facebook}
                      </p>
                    )
                  }
                </div>
                <div className="grid grid-cols-4">
                  <p className="text-left shrink-0 text-sm sm:text-base">
                    อินสตาแกรม :
                  </p>
                  {
                    // if start with https use <a> else use <p>
                    instagram.startsWith("https://") ? (
                      <a
                        href={instagram}
                        className="text-sm sm:text-base font-normal col-span-3 underline text-blue-600"
                      >
                        {instagram}
                      </a>
                    ) : (
                      <p className="text-sm sm:text-base font-normal col-span-3">
                        {instagram}
                      </p>
                    )
                  }
                </div>
              </div>
            </div>
            <div className="rounded-[10px] col-span-2 h-[300px] lg:h-[365px] bg-slate-200 w-full max-w-[520px] overflow-hidden drop">
              <StaticMap lat={latitude} lng={longitude} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-lg sm:text-xl font-semibold">แกลลอรี่องค์กร</p>
          <GalleryCarousel gallery={gallery} />
        </div>
      </div>
    </Suspense>
  );
}
