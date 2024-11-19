import { loginSchema } from "@/lib/types";
import { NextResponse } from "next/server";

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 * /api/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User login endpoint
 *     description: Authenticates a user with their credentials
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Zod Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "Invalid email format"
 *                     password:
 *                       type: string
 *                       example: "Password must be at least 6 characters"
 */

export async function POST(req: Request) {
  // Parse the incoming request body
  const body: unknown = await req.json();

  // Validate the data using Zod schema
  const result = loginSchema.safeParse(body);
  let zodErrors = {};

  // Collect validation errors if any
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  }

  // Delay for 3 seconds before sending the response, remove after you have a backend
  await new Promise((resolve) => setTimeout(resolve, 3000)); // 3000 ms = 3 seconds

  // If validation failed, return the error response
  if (Object.keys(zodErrors).length > 0) {
    return NextResponse.json({ errors: zodErrors }, { status: 400 });
  }

  //----------------------------------------------------------

  // Send data to Golang backend if validation is successful, PUT YOUR CODE HERE

  //----------------------------------------------------------

  // Return success response
  if (Object.keys(zodErrors).length == 0) {
    return NextResponse.json({ success: true }, { status: 200 });
  }
}
