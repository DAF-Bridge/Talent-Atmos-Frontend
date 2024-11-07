import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";

export default function Register() {
  return (
    <div className="font-prompt lg:overflow-hidden h-full sm:h-[100vh]">
      <div
        className="flex flex-col items-center gap-4 sm:gap-5 w-full lg:max-w-[914px] bg-white h-full
        lg:rounded-t-[20px] mx-auto lg:mt-[43px] px-[50px] md:px-[84px]"
      >
        <p className="text-4xl font-semibold text-center text-orange-dark mt-[34px]">
          สมัครสมาชิก
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-4 sm:gap-[26px]">
          <div className="w-full">
            <Label className="text-base font-normal" htmlFor="first-name">
              ชื่อจริง
            </Label>
            <Input
              className="auth-input"
              type="text"
              id="first-name"
              placeholder="ชื่อจริง"
            />
          </div>
          <div className="w-full">
            <Label className="text-base font-normal" htmlFor="last-name">
              นามสกุล
            </Label>
            <Input
              className="auth-input"
              type="text"
              id="last-name"
              placeholder="นามสกุล"
            />
          </div>
        </div>
        <div className="w-full">
          <Label className="text-base font-normal" htmlFor="email">
            อีเมล
          </Label>
          <Input
            className="auth-input"
            type="email"
            id="email"
            placeholder="example@gmail.com"
          />
        </div>
        <div className="w-full">
          <Label className="text-base font-normal" htmlFor="phone-num">
            เบอร์โทรศัพท์
          </Label>
          <Input
            className="auth-input"
            type="text"
            id="phone-num"
            placeholder="0812345678"
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-4 sm:gap-[26px]">
          <div className="w-full">
            <Label className="text-base font-normal" htmlFor="password">
              รหัสผ่าน
            </Label>
            <Input
              className="auth-input"
              type="password"
              id="password"
              placeholder="รหัสผ่าน"
            />
          </div>
          <div className="w-full">
            <Label className="text-base font-normal" htmlFor="confirm-password">
              ยืนยันรหัสผ่าน
            </Label>
            <Input
              className="auth-input"
              type="password"
              id="confirm-password"
              placeholder="ยืนยันรหัสผ่าน"
            />
          </div>
        </div>
        <div className="flex flex-col w-full mb-[60px]">
          <div className="inline-flex gap-1 w-full justify-center sm:justify-start items-center self-start">
            <Checkbox id="policies" />
            <Label
              className="hover:cursor-pointer font-light text-base"
              htmlFor="policies"
            >
              คุณยอมรับ
              <Link
                className="ml-1 hover:underline text-orange-dark hover:text-orange-normal"
                href={"/policies"}
              >
                ข้อกำหนดและเงื่อนไข
              </Link>
            </Label>
          </div>
          <div className="flex flex-col w-full gap-[20px]">
            <Button
              className="self-center sm:self-end mt-8 sm:mt-0 text-lg font-normal bg-orange-dark hover:bg-orange-normal hover:shadow-md 
            h-[46px] rounded-[10px] w-full sm:w-[129px]"
            >
              ต่อไป
            </Button>
            <div className="flex self-center sm:self-end">
              <p className="text-base font-light">
                คุณเป็นสมาชิกอยู่แล้วหรือไม่?
              </p>

              <Link
                className="ml-1 hover:underline font-normal text-orange-dark hover:text-orange-normal"
                href={"/login"}
              >
                เข้าสู่ระบบ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
