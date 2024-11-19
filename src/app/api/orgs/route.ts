import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/organizations:
 *   get:
 *     tags:
 *       - Organizations
 *     summary: Get all organizations
 *     description: Retrieves a list of all organizations with their names and logo images
 *     responses:
 *       200:
 *         description: Successfully retrieved organizations
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
 *                       name:
 *                         type: string
 *                         example: "ไทยสตาร์ทอัพ"
 *                       imgUrl:
 *                         type: string
 *                         example: "https://drive.google.com/uc?export=view&id=1mzjpHi5GHFrUEEmI_EVLfQE9ht2--ILd"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch organization"
 */

export async function GET() {
  try {
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
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch organization" },
      { status: 500 }
    );
  }
}
