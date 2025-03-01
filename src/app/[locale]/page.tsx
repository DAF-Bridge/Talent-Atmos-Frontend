"use client";

import BigFooter from "@/components/layout/BigFooter";
import NavigationBar from "@/components/layout/Navbar/NavBar";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <>
      <NavigationBar />
      <div className="font-prompt max-w-[1170px] mx-auto px-6 mt-[60px] min-h-[80vh]">
        <div className="flex flex-col items-center justify-center h-[90vh] gap-4 py-auto">
          <p className="text-[90px] font-semibold text-center leading-none">
          {t('title')}
          </p>
          <div className="flex flex-col items-center gap-10">
            <p className="text-center text-xl">
              แหล่งรวมกิจกรรมเสริมศักยภาพ ก้าวข้ามขีดจำกัดของคุณ
              <br />
              ยกระดับเส้นทางสู่อนาคต
            </p>
            <button
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLScoSWKAD5WRiycqEcIzGKN3vaIP7KgnFtpr7X8BaPJu017PpQ/viewform?usp=dialog",
                  "_blank"
                )
              }
              className="bg-orange-normal hover:bg-orange-normal/80 text-white flex flex-col 
              items-center justify-center px-[15px] py-[10px] rounded-md font-semibold"
            >
              ลงทะเบียนติดตามข่าวสาร
            </button>
          </div>
        </div>
      </div>
      <BigFooter />
    </>
  );
}
