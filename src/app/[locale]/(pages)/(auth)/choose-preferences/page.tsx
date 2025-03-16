"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Users, Building2 } from "lucide-react";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { BiNetworkChart } from "react-icons/bi";
import {
  HiOutlineLightBulb,
  HiOutlinePresentationChartBar,
} from "react-icons/hi";
import { CgDisplayGrid } from "react-icons/cg";
import { GrWorkshop } from "react-icons/gr";
import { MdOutlinedFlag } from "react-icons/md";

export default function PreferencesPage() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    { id: "incubation", name: "พัฒนาธุรกิจ", icon: HiOutlineRocketLaunch },
    { id: "networking", name: "สร้างเครือข่าย", icon: BiNetworkChart },
    { id: "forum", name: "ฟอรัมพูดคุย", icon: HiOutlinePresentationChartBar },
    { id: "exhibition", name: "แสดงสินค้า & นวัตกรรม", icon: CgDisplayGrid },
    { id: "competition", name: "แข่งขันชิงรางวัล", icon: HiOutlineLightBulb },
    { id: "workshop", name: "เวิร์คชอปให้ความรู้", icon: GrWorkshop },
    { id: "campaign", name: "แคมเปญส่วนรวม", icon: MdOutlinedFlag },
    { id: "environment", name: "พัฒนาสิ่งแวดล้อม", icon: Leaf },
    { id: "social", name: "พัฒนาสังคม", icon: Users },
    { id: "governance", name: "การบริหาร & กำกับดูแล", icon: Building2 },
  ];

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleContinue = async () => {
    // Here you would typically save the preferences to your backend
    console.log("Selected categories:", selectedCategories);

    // Mock API call to save preferences
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Redirect to home page or dashboard after saving preferences
      router.push("/");
    } catch (error) {
      console.error("Failed to save preferences:", error);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] overflow-y-auto bg-white px-10">
      <div className="container max-w-5xl py-10 mx-auto">
        <div className="space-y-6 text-center mb-10">
          <h1 className="text-3xl font-bold">เลือกหมวดหมู่ที่สนใจ</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            กรุณาเลือกหมวดหมู่ที่คุณสนใจ
            เพื่อการแสดงผลกิจกรรมและงานที่ตรงตามความสนใจของคุณ
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category.id);
            const Icon = category.icon;

            return (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "hover:border-primary/50"
                }`}
                onClick={() => toggleCategory(category.id)}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <Icon
                    className={`h-10 w-10 mb-2 ${
                      isSelected ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      isSelected ? "text-primary" : ""
                    }`}
                  >
                    {category.name}
                  </span>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={selectedCategories.length === 0}
            className="w-full md:w-auto"
          >
            ยืนยัน
          </Button>
        </div>

        {/* <div className="mt-4 text-center">
        <Button variant="link" onClick={() => router.push("/dashboard")}>
          Skip for now
        </Button>
      </div> */}
      </div>
    </div>
  );
}
