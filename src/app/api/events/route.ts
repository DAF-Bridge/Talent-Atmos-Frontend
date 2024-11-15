import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/events:
 *   get:
 *     tags:
 *       - Events
 *     summary: Get all events
 *     description: Retrieves a list of all events with their titles, dates, and image URLs
 *     responses:
 *       200:
 *         description: Successfully retrieved events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: "Builds Idea 2024"
 *                       date:
 *                         type: string
 *                         example: "13 ก.ค. - 07 ส.ค. 2567"
 *                       imgUrl:
 *                         type: string
 *                         example: "https://drive.google.com/uc?export=view&id=1-wqxOT_uo1pE_mEPHbJVoirMMH2Be3Ks"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch events"
 */
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
