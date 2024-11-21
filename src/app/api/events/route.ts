import { NextResponse } from "next/server";

export async function GET() {
  try {
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
          "https://drive.google.com/uc?export=view&id=1lb2Tn_VZU6OkQHAh-tVcbxoAOTguUWw1",
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

    // Delay for 3 seconds before sending the response, remove after you have a backend
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 3000 ms = 3 seconds

    return NextResponse.json({ data: mockEvents });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
