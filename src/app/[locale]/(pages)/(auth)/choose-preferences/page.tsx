"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Users, Building2, X, ArrowLeft } from "lucide-react";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { BiNetworkChart } from "react-icons/bi";
import {
  HiOutlineLightBulb,
  HiOutlinePresentationChartBar,
} from "react-icons/hi";
import { CgDisplayGrid } from "react-icons/cg";
import { GrWorkshop } from "react-icons/gr";
import { MdOutlinedFlag } from "react-icons/md";
import Spinner from "@/components/ui/spinner";
import {
  ListCategories,
  CreatePreferences,
  GetUserPreference,
  UpdatePreference,
} from "@/features/preferences/api/action";
import { CategoryProps } from "@/lib/types";
import toast from "react-hot-toast";
import { Link } from "@/i18n/routing";

export default function PreferencesPage() {
  const [selectedCategories, setSelectedCategories] = useState<CategoryProps[]>(
    []
  );
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const excludeVal = [10, 1, 2, 14, 15];
        const [categoriesData, preference] = await Promise.all([
          ListCategories(),
          GetUserPreference(),
        ]);

        if (!categoriesData) {
          throw new Error("Failed to get categories");
        }

        console.log("All Categories:", categoriesData);
        console.log("User preference:", preference);

        const filteredCategories = categoriesData.filter(
          (category: CategoryProps) => !excludeVal.includes(category.value)
        );

        if (preference) {
          // Match selected categories with existing list
          const selected = filteredCategories.filter((category) =>
            preference.some(
              (pref: CategoryProps) => pref.value === category.value
            )
          );

          setSelectedCategories(selected);
          setCategories(filteredCategories);
          setIsEdit(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleCategory = (category: CategoryProps) => {
    // if (selectedCategories.length >= 4) {
    //   toast.error("คุณสามารถเลือกไม่เกิน 4 หมวดหมู่");
    // }
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((id) => id !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    let result;
    if (isEdit) {
      // if user already has preference
      result = await UpdatePreference(selectedCategories);
    } else {
      // if user doesn't have preference
      result = await CreatePreferences(selectedCategories);
    }

    if (result.success) {
      toast.success("บันทึกสําเร็จ");
    } else {
      toast.error("บันทึกไม่สําเร็จ กรุณาลองใหม่อีกครั้ง");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="w-[100vw] h-[100vh] overflow-y-auto bg-white px-10">
      <div className="container max-w-5xl py-10 mx-auto">
        <Link href="/" className="pt-[71px]">
          <div
            className="rounded-full inline-flex gap-2 
            text-base font-medium text-start px-5 py-1 transition-all duration-200"
          >
            <ArrowLeft height={30} width={30} />
            <p className="self-center">กลับสู่หน้าหลัก</p>
          </div>
        </Link>
        <div className="space-y-6 text-center mb-10">
          <h1 className="text-3xl font-bold">เลือกหมวดหมู่ที่สนใจ</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            กรุณาเลือกหมวดหมู่ที่คุณสนใจ
            เพื่อการแสดงผลกิจกรรมและงานที่ตรงตามความสนใจของคุณ
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-1 justify-center items-center w-full pt-16 pb-20">
            <Spinner />
            <span className="text-center">Loading...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category);
              const Icon = getCategoryIcon(category.label);

              return (
                <Card
                  key={category.value}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isSelected
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => {
                    !isSubmitting && toggleCategory(category);
                  }}
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
                      {getCategoryName(category.label)}
                    </span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={selectedCategories.length === 0 || isSubmitting}
            className="w-full md:w-auto"
          >
            {isSubmitting ? <Spinner /> : "ยืนยัน"}
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

const getCategoryIcon = (label: string) => {
  switch (label) {
    case "incubation":
      return HiOutlineRocketLaunch;
    case "networking":
      return BiNetworkChart;
    case "forum":
      return HiOutlinePresentationChartBar;
    case "exhibition":
      return CgDisplayGrid;
    case "competition":
      return HiOutlineLightBulb;
    case "workshop":
      return GrWorkshop;
    case "campaign":
      return MdOutlinedFlag;
    case "environment":
      return Leaf;
    case "social":
      return Users;
    case "governance":
      return Building2;
    default:
      return X;
  }
};

const getCategoryName = (label: string) => {
  switch (label) {
    case "incubation":
      return "บ่มเพาะธุรกิจ";
    case "networking":
      return "สร้างเครือข่าย";
    case "forum":
      return "สัมมนา ฟอรัม";
    case "exhibition":
      return "นิทรรศการจัดแสดง";
    case "competition":
      return "การแข่งขัน";
    case "workshop":
      return "เวิร์คชอปให้ความรู้";
    case "campaign":
      return "แคมเปญ";
    case "environment":
      return "Environment";
    case "social":
      return "Social";
    case "governance":
      return "Governance";
    default:
      return "...";
  }
};
