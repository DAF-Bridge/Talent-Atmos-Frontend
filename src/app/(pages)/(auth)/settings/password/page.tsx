"use client";

import { useState } from "react";
import React, { use } from "react";
import { changePasswordSchema, TChangePasswordSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordRating } from "@/components/PasswordRating";
import Link from "next/link";
import { Eye, EyeOff, House } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { formatInternalUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function password() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm<TChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  const [isFocused, setIsFocused] = useState(false);
  // const password = watch("password"); // Use watch to monitor password field

  return (
    <div className="font-prompt">
      <p className="text-2xl font-semibold text-left text-blac">
        เปลี่ยนรหัสผ่าน
      </p>
      <form
      // onSubmit={handleSubmit(onSubmit)}
      // className="flex flex-col gap-4 mt-[21px]"
      >
        <div className="flex flex-row gap-2">
          <div>
            <Label className="text-base font-normal" htmlFor="password">
              รหัสผ่านเดิม{" "}
              {/* {errors.email && (
              <span className="error-msg">
                {errors.email.message as string}
              </span>
            )} */}
            </Label>

            <Input
              //   {...register("email")}
              className="sm:w-[300px] h-[40px] rounded-[10px] border-gray-300 px-4 py-2"
              //   type="email"
              //   id="email"
              //   placeholder="อีเมล"
            />
          </div>
          <Link
            href={"/forgot-password"}
            className="text-sm sm:text-base font-normal underline hover:text-gray-600 self-end"
          >
            ลืมรหัสผ่าน
          </Link>
        </div>

        <div className="flex flex-row">
          <div>
            <Label className="text-base font-normal" htmlFor="password">
              รหัสผ่านใหม่{" "}
              {/* {errors.password && (
              <span className="error-msg">
                {errors.password.message as string}
              </span> */}
              {/* )} */}
            </Label>
            <div className="relative">
              <Input
                // {...register("password")}
                className="sm:w-[300px] h-[40px] rounded-[10px] border-gray-300 px-4 py-2"
                // type={showPassword ? "text" : "password"}
                // id="password"
                // placeholder="รหัสผ่าน"
                // onFocus={() => setIsFocused(true)}
                // onBlur={() => setIsFocused(false)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
              {/* {isFocused && password.length > 0 && (
              <PasswordRating password={password} />
            )} */}
            </div>
          </div>
        </div>

        <Button
          className="text-xl font-normal bg-orange-dark hover:bg-orange-normal hover:shadow-md h-[45px] sm:h-[50px] 
              rounded-[10px] mt-[24px]"
          type="submit"
          disabled={isSubmitting}
        >
          บันทึกข้อมูล
        </Button>
      </form>
    </div>
  );
}
