import OrgTab from "@/features/orgs/components/OrgTab";
import Image from "next/image";

interface OrgPageLayoutProps {
  params: { orgId: string };
  children: React.ReactNode;
}


export default function OrgPageLayout({
  children,
  params,
}: Readonly<OrgPageLayoutProps>) {
  const { orgId } = params;
  return (
    <div className="max-w-[1170px] mx-auto px-6 mt-[90px] sm:mt-[77px] pb-16">
      <div className="relative">
        <div className="hidden sm:block w-full h-[150px] sm:h-[200px] rounded-[20px] overflow-hidden">
          <Image
            className="w-full h-full object-cover"
            src={
              "https://drive.google.com/uc?export=view&id=1qOsmXXIF7qUOzv9RKNxkZGdOSmpKymxL"
            }
            height={800}
            width={1000}
            alt={"organization-background-image"}
          />
        </div>
        <div className="relative sm:absolute -bottom-[90%] sm:-bottom-[50%] left-0 ">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 justify-center items-center">
            <div
              style={{ aspectRatio: "1 / 1" }}
              className="shrink-0 h-[100px] w-[100px] sm:h-[150px] sm:w-[150px] rounded-[20px] overflow-hidden drop-shadow-md"
            >
              <Image
                className="w-full h-full object-cover"
                src={
                  "https://drive.google.com/uc?export=view&id=1mzjpHi5GHFrUEEmI_EVLfQE9ht2--ILd"
                }
                height={500}
                width={500}
                alt={"organization-background-image"}
              />
            </div>
            <div className="flex flex-col sm:mt-11 text-center sm:text-left">
              <p className="text-lg sm:text-2xl font-medium line-clamp-1">
                builds มหาวิทยาลัยเชียงใหม่ {orgId}
              </p>
              <p className="text-sm sm:text-base font-light line-clamp-2">
                Startup & Entrepreneurial Program
                โปรแกรมการสร้างสตาร์ทอัพและผู้ประกอบการ มหาวิทยาลัยเชียงใหม่
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[10px] sm:mt-[120px] w-full">
        <OrgTab />
      </div>
      <div className="flex flex-col gap-[60px] mt-8 min-h-[10vh]">{children}</div>
    </div>
  );
}
