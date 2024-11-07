import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <div className="font-prompt flex h-[100vh]">
      <div className="hidden px-[4%] lg:flex lg:flex-col lg:w-[58%] ">
        <Link href="/" className="absolute pt-[71px]">
          <div className="rounded-full border-2 border-[#353A47] hover:shadow-lg inline-flex gap-2 text-base font-medium text-start px-5 py-1">
            <ArrowLeft height={35} width={35} />
            <p className="self-center">กลับสู่หน้าหลัก</p>
          </div>
        </Link>
        <div className="h-full flex px-[5%]">
          <Image
            className="justify-self-center"
            src={"/inline-logo.svg"}
            width={1000}
            height={179}
            alt="login"
          />
        </div>
      </div>
      <div className="lg:pt-9 w-full lg:w-[42%] sm:px-0">
        <div className="relative border bg-white lg:rounded-t-[20px] w-full lg:max-w-[538px] h-full mx-auto lg:mr-7 lg:ml-0">
          <div className="mx-auto mt-[67px] w-[78%] flex flex-col">
            <Link
              className="absolute inline-flex gap-1 top-[40px] left-[40px] lg:hidden hover:cursor-pointer"
              href={"/"}
            >
              <ArrowLeft height={30} width={30} />
              <p className="self-center hidden sm:block">กลับสู่หน้าหลัก</p>
            </Link>
            <p className="text-4xl font-semibold text-center text-orange-dark">
              เข้าสู่ระบบ
            </p>

            <div className="flex flex-col gap-4 mt-[21px]">
              <div>
                <Label className="text-base font-normal" htmlFor="email">
                  อีเมล
                </Label>
                <Input
                  className="login-input"
                  type="email"
                  id="email"
                  placeholder="อีเมล"
                />
              </div>
              <div>
                <Label className="text-base font-normal" htmlFor="password">
                  รหัสผ่าน
                </Label>
                <Input
                  className="login-input"
                  type="password"
                  id="password"
                  placeholder="รหัสผ่าน"
                />
              </div>
              <div className="flex justify-between">
                <div className="inline-flex gap-1 items-center">
                  <Checkbox id="remember" />
                  <Label
                    className="hover:cursor-pointer font-normal text-base"
                    htmlFor="remember"
                  >
                    จดจำบัญชีนี้
                  </Label>
                </div>
                <Link
                  href={"/forgot-password"}
                  className="text-base font-normal underline hover:text-gray-600"
                >
                  ลืมรหัสผ่าน
                </Link>
              </div>
            </div>
            <div></div>
            <Button className="text-xl bg-orange-dark hover:bg-orange-normal h-[50px] rounded-[10px] mt-[40px]">
              เข้าสู่ระบบ
            </Button>
            <div className="flex justify-center mt-[17px]">
              <p>คุณยังไม่เป็นสมาชิกใช่หรือไม่? </p>
              <Link
                href={"/register"}
                className="text-orange-dark hover:underline"
              >
                สมัครเลย
              </Link>
            </div>
            <div className="h-[21px] flex justify-center items-center my-[26px]">
              <div className="w-full border border-gray-300 relative" />
              <p className="mx-2 text-sm">หรือ</p>
              <div className="w-full border border-gray-300 relative" />
            </div>
            <div className="flex flex-col xl:flex-row justify-center gap-[10px]">
              <button className="oauth-btn">
                <Image
                  src={"./icon/google-icon.svg"}
                  width={33}
                  height={33}
                  alt="google-login"
                />
                เข้าสู่ระบบด้วย Google
              </button>
              <button className="oauth-btn">
                <Image
                  src={"./icon/fb-icon.svg"}
                  width={33}
                  height={33}
                  alt="google-login"
                />
                เข้าสู่ระบบด้วย Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
