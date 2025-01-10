"use client";

import BigFooter from "@/components/layout/BigFooter";
import NavigationBar from "@/components/layout/Navbar/NavBar";

export default function Home() {
  return (
    <>
      <NavigationBar />
      <div className="font-prompt max-w-[1170px] mx-auto px-6 mt-[60px] min-h-[80vh]">
        <div className="flex flex-col items-center justify-center h-[90vh] gap-24 py-auto">
          <p className="text-[72px] font-semibold text-center leading-none">
            Uplifting simplicity <br /> to sustainability
          </p>
          <div className="flex flex-col items-center gap-3">
            <p className="text-center">
              From business activities to environmental
              <br /> report with no expertise needed.
            </p>
            <button
              onClick={() => window.open("https://www.google.com/", "_blank")}
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
