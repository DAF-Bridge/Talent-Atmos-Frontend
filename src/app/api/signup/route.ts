import { signupSchema } from "@/lib/types";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User Signup
 *     description: Validates user input for signup and ensures the data conforms to specific rules.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: User's first name.
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: User's last name.
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address.
 *                 example: "johndoe@example.com"
 *               phone:
 *                 type: string
 *                 description: User's phone number (must be exactly 10 digits).
 *                 example: "0123456789"
 *               password:
 *                 type: string
 *                 description:
 *                   The user's password, must include at least 8 characters with:
 *                   - One uppercase letter
 *                   - One lowercase letter
 *                   - One number
 *                   - One special character (!@#$%^&*_)
 *                 example: "StrongP@ss1"
 *               confirmPassword:
 *                 type: string
 *                 description: Must match the password.
 *                 example: "StrongP@ss1"
 *               policies:
 *                 type: boolean
 *                 description: Must be `true` to accept terms and conditions.
 *                 example: true
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phone
 *               - password
 *               - confirmPassword
 *               - policies
 *     responses:
 *       200:
 *         description: Signup successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Validation errors occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   additionalProperties:
 *                     type: string
 *                   example:
 *                     firstName: "กรุณากรอกชื่อ"
 *                     phone: "กรุณากรอกตัวเลข 10 ตัว"
 *                     password: "ต้องมีตัวอักษรพิมพ์ใหญ่"
 */

export async function POST(req: Request) {
  // Parse the incoming request body
  const body: unknown = await req.json();

  // Validate the data using Zod schema
  const result = signupSchema.safeParse(body);
  let zodErrors = {};

  // Collect validation errors if any
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  }

  // Delay for 3 seconds before sending the response
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
