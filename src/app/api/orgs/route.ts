import { NextResponse } from "next/server";

export async function GET() {
  const mockOrg = [
    {
      name: "ไทยสตาร์ทอัพ",
      imgUrl:
        "https://drive.google.com/uc?export=view&id=1mzjpHi5GHFrUEEmI_EVLfQE9ht2--ILd",
    },
    {
      name: "SEA Bridge Talent",
      imgUrl:
        "https://drive.google.com/uc?export=view&id=1bsT5WNkFnhhGT7SD3AynO9gqDjzz17lc",
    },
    {
      name: "Educatique Co.",
      imgUrl:
        "https://drive.google.com/uc?export=view&id=1ZR2xgI4izSkZ4fEGEOr54fxDh7t2R-Uf",
    },
    {
      name: "Social Entrepreneur Club",
      imgUrl:
        "https://drive.google.com/uc?export=view&id=1D9ldIaOqNZVaGemuZiKPbHHZOgAv46S9",
    },
    {
      name: "Rabbit Start",
      imgUrl:
        "https://drive.google.com/uc?export=view&id=1UqwGnXRwvZOXfOVAmVKa8oAlzcRzPXMq",
    },
    {
      name: "Builds มหาวิทยาลัยเชียงใหม่",
      imgUrl:
        "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
    },
  ];

  // Delay for 3 seconds before sending the response, remove after you have a backend
  await new Promise((resolve) => setTimeout(resolve, 3000)); // 3000 ms = 3 seconds

  return NextResponse.json({ data: mockOrg });
}
