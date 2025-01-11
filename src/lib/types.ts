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
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  picUrl: string;
  location: string;
  category: string;
  organization: {
    id: number;
    name: string;
    picUrl: string;
  };
};

export type EventDescriptionProps = {
  event: {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate?: string;
    startTime: string;
    endTime?: string;
    price: string;
    picUrl: string;
    highlight: string;
    requirements: string;
    outcomes: Array<string>;
    timeline: Array<{ date: string; content: string }>;
    benefits: Array<string>;
    location: {
      name: string;
      map_url: string;
      image_url: string;
      lat: number;
      lng: number;
    };
    contact: Array<{ type: string; url: string }>;
    regLink: string;
  };
  organization: {
    id: number;
    name: string;
    picUrl: string;
  };
}

export type BriefOrganization = {
  name: string;
  imgUrl: string;
};

export type Organization = {
  id: number;
  pic_url: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  industry: string[];
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
  setAuthState: () => void;
  removeAuthState: () => void;
};

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type Category = {
  icon: React.ReactNode;
  id:
    | "all"
    | "incubation"
    | "networking"
    | "forum"
    | "exhibition"
    | "competition"
    | "workshop"
    | "campaign";
  title: string;
};
