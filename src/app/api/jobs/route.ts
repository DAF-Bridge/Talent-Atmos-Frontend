import { NextResponse } from "next/server";

export async function GET() {
  try {
    const mockJob = [
      {
        orgName: "องค์กรทดสอบ adadad",
        imgUrl:
          "https://drive.google.com/uc?export=view&id=1bsT5WNkFnhhGT7SD3AynO9gqDjzz17lc",
        jobTitle: "งานทดสอบ 1",
        location: "เชียงใหม่",
      },
      {
        orgName: "องค์กรทดสอบ 2",
        imgUrl:
          "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
        jobTitle: "งานทดสอบ 2",
        location: "ออนไลน์",
      },
      {
        orgName: "องค์กรทดสอบ 3",
        imgUrl:
          "https://drive.google.com/uc?export=view&id=1ZR2xgI4izSkZ4fEGEOr54fxDh7t2R-Uf",
        jobTitle: "งานทดสอบ 3",
        location: "ออนไลน์",
      },
      {
        orgName: "องค์กรทดสอบ 4",
        imgUrl:
          "https://drive.google.com/uc?export=view&id=1D9ldIaOqNZVaGemuZiKPbHHZOgAv46S9",
        jobTitle: "งานทดสอบ 4",
        location: "ออนไลน์",
      },
      {
        orgName: "องค์กรทดสอบ 5",
        imgUrl:
          "https://drive.google.com/uc?export=view&id=1mzjpHi5GHFrUEEmI_EVLfQE9ht2--ILd",
        jobTitle: "งานทดสอบ 5",
        location: "ออนไลน์",
      },
      {
        orgName: "องค์กรทดสอบ 5",
        imgUrl:
          "https://drive.google.com/uc?export=view&id=1mzjpHi5GHFrUEEmI_EVLfQE9ht2--ILd",
        jobTitle: "งานทดสอบ 5",
        location: "ออนไลน์",
      },
      {
        orgName: "องค์กรทดสอบ 5",
        imgUrl:
          "https://drive.google.com/uc?export=view&id=1mzjpHi5GHFrUEEmI_EVLfQE9ht2--ILd",
        jobTitle: "งานทดสอบ 5",
        location: "ออนไลน์",
      },
    ];

    // Delay for 3 seconds before sending the response, remove after you have a backend
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 3000 ms = 3 seconds

    return NextResponse.json({ data: mockJob });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Jobs" },
      { status: 500 }
    );
  }
}
