import { NextResponse } from "next/server";

export async function GET() {
  const mockEvents = [
    {
      title: "Builds Idea 2024",
      date: "13 ก.ค. - 07 ส.ค. 2567",
      imgUrl:
        "https://drive.google.com/uc?export=view&id=1-wqxOT_uo1pE_mEPHbJVoirMMH2Be3Ks",
    },
    {
      title: "Smart Solution Idea",
      date: "13 ก.ค. - 07 ส.ค. 2567",
      imgUrl:
        "https://drive.google.com/uc?export=view&id=1GfscjgEilPpYZXBoHNgGTy--4v7oTVfO",
    },
    {
      title: "Builds Business 2024",
      date: "13 ก.ค. - 07 ส.ค. 2567",
      imgUrl:
        "https://drive.google.com/uc?export=view&id=1IudlzzRffCIGBQcGtQhoYriBbMhUQGwE",
    },
    {
      title: "Builds Idea 2024",
      date: "13 ก.ค. - 07 ส.ค. 2567",
      imgUrl:
        "https://drive.google.com/uc?export=view&id=1-wqxOT_uo1pE_mEPHbJVoirMMH2Be3Ks",
    },
    {
      title: "Smart Solution Idea",
      date: "13 ก.ค. - 07 ส.ค. 2567",
      imgUrl:
        "https://drive.google.com/uc?export=view&id=1GfscjgEilPpYZXBoHNgGTy--4v7oTVfO",
    },
    {
      title: "Builds Business 2024",
      date: "13 ก.ค. - 07 ส.ค. 2567",
      imgUrl:
        "https://drive.google.com/uc?export=view&id=1IudlzzRffCIGBQcGtQhoYriBbMhUQGwE",
    },
    {
      title: "Builds Idea 2024",
      date: "13 ก.ค. - 07 ส.ค. 2567",
      imgUrl:
        "https://drive.google.com/uc?export=view&id=1-wqxOT_uo1pE_mEPHbJVoirMMH2Be3Ks",
    },
    {
      title: "Smart Solution Idea",
      date: "13 ก.ค. - 07 ส.ค. 2567",
      imgUrl:
        "https://drive.google.com/uc?export=view&id=1GfscjgEilPpYZXBoHNgGTy--4v7oTVfO",
    },
    {
      title: "Builds Business 2024",
      date: "13 ก.ค. - 07 ส.ค. 2567",
      imgUrl:
        "https://drive.google.com/uc?export=view&id=1IudlzzRffCIGBQcGtQhoYriBbMhUQGwE",
    },
  ];

  return NextResponse.json({ data: mockEvents });
}
