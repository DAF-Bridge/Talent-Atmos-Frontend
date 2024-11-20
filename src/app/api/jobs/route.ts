import { NextResponse } from "next/server";

export async function GET() {
  const mockJob = [
        {
          orgName: "องค์กรทดสอบ 1",
          imgUrl: "https://drive.google.com/uc?export=view&id=1bsT5WNkFnhhGT7SD3AynO9gqDjzz17lc",
          jobTitle: "งานทดสอบ 1",
          location: "เชียงใหม่",
        },
        {
          orgName: "องค์กรทดสอบ 2",
          imgUrl: "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
          jobTitle: "งานทดสอบ 2",
          location: "ออนไลน์",
        },
        {
            orgName: "องค์กรทดสอบ 3",
            imgUrl: "https://drive.google.com/uc?export=view&id=1ZR2xgI4izSkZ4fEGEOr54fxDh7t2R-Uf",
            jobTitle: "งานทดสอบ 3",
            location: "ออนไลน์",
        },
        {
            orgName: "องค์กรทดสอบ 4",
            imgUrl: "https://drive.google.com/uc?export=view&id=1D9ldIaOqNZVaGemuZiKPbHHZOgAv46S9",
            jobTitle: "งานทดสอบ 4",
            location: "ออนไลน์",
        },
        {
            orgName: "องค์กรทดสอบ 5",
            imgUrl: "https://drive.google.com/uc?export=view&id=1mzjpHi5GHFrUEEmI_EVLfQE9ht2--ILd",
            jobTitle: "งานทดสอบ 5",
            location: "ออนไลน์",
        },
  ];
  return NextResponse.json({ data: mockJob });
}