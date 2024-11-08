import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z.string().min(1, { message: "กรุณากรอกชื่อ" }),
    lastName: z.string().min(1, { message: "กรุณากรอกนามสกุล" }),
    email: z.string().email({ message: "กรุณากรอกอีเมล" }),
    phone: z
      .string()
      .regex(/^\d+$/, { message: "กรุณากรอกตัวเลข" })
      .min(10, { message: "กรุณากรอกตัวเลข 10 ตัว" })
      .max(10, { message: "กรุณากรอกตัวเลข 10 ตัว" }),
    password: z.string().min(8, { message: "กรุณากรอกอย่างน้อย 8 ตัวอักษร" }),
    confirmPassword: z
      .string()
      .min(8, { message: "กรุณากรอกอย่างน้อย 8 ตัวอักษร" }),
    policies: z.boolean().refine((val) => val === true, {
      message: "กรุณายอมรับข้อกำหนดและนโยบาย",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email({ message: "กรุณากรอกอีเมล" }),
  password: z.string().min(1, { message: "กรุณากรอกรหัสผ่าน" }),
});

export type TLogInSchema = z.infer<typeof loginSchema>;
