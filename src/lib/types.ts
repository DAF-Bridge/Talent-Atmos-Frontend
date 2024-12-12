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
    password: z
      .string()
      .min(8, { message: "ตวามยาวอย่างน้อย 8 ตัวอักษร" })
      .regex(/[A-Z]/, { message: "ต้องมีตัวอักษรพิมพ์ใหญ่" })
      .regex(/[a-z]/, { message: "ต้องมีตัวอักษรพิมพ์เล็ก" })
      .regex(/\d/, { message: "ต้องมีตัวเลขอย่างน้อยหนึ่งตัว" })
      .regex(/[!@#$%^&*_]/, {
        message: "ต้องมีอักขระพิเศษ (!@#$%^&*_)",
      }),
    confirmPassword: z.string(),
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

export type Event = {
  title: string;
  date: string;
  imgUrl: string;
};

export type Organization = {
  name: string;
  imgUrl: string;
};

export type Job = {
  orgName: string;
  imgUrl: string;
  jobTitle: string;
  location: string;
};

export type UserProfile = {
  ID: number;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  pic_url: string;
  user_id: number;
};

export type AuthContextType = {
  isAuth: boolean | null;
  userProfile: UserProfile | null;
  loading: boolean;
  setAuthState: (token: string) => void;
  removeAuthState: () => void;
};