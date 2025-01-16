"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, TLogInSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, House } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { formatExternalUrl, formatInternalUrl } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage(): JSX.Element {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { setAuthState } = useAuth();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = () => {
    window.location.href = formatExternalUrl("/auth/google");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TLogInSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    // Show loading toast immediately when the request is sent
    const loadingToastId = toast.loading("รอสักครู่...");

    try {
      // Send POST request to Next API
      const apiUrl = formatInternalUrl("/api/login");
      const response = await fetch(apiUrl, {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Send and receive cookies
        body: JSON.stringify(data),
      });

      // On-Recieve Response : Dismiss the loading toast
      toast.dismiss(loadingToastId);

      // if the response if ok redirect to home, if not, show error toast
      if (response.ok) {
        // // Update isAuth to true
        setAuthState(); // Update the auth state globally
        setIsRedirecting(true);
        const successToastId = toast.success("เข้าสู่ระบบสําเร็จ");

        // Delay the redirect to show the toast
        setTimeout(() => {
          toast.dismiss(successToastId); // Clear the success toast
          setIsRedirecting(false);
          router.push("/"); // Redirect to home
        }, 1500); // Delay of 1.5 seconds for users to see the success message

        return;
      } else {
        // if the server validation caught an error
        const responseData = await response.json();

        // set the errors to each field
        if (responseData.errors) {
          const errors = responseData.errors;
          if (responseData.status === 400) {
            Object.entries(responseData.errors).forEach(([key, message]) => {
              setError(key as keyof TLogInSchema, {
                type: "server",
                message: message as string,
              });
            });
          } else {
            const errorMessage =
              typeof errors === "string"
                ? errors
                : "An unknown error occurred.";
            toast.error(errorMessage);
          }
        }
      }
    } catch (error) {
      // if fail to sent request to server
      toast.dismiss();
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      console.error(error);
    }
  };

  return (
    <div className="font-prompt flex h-[100vh]">
      <div className="hidden px-[4%] lg:flex lg:flex-col lg:w-[58%] ">
        <Link href="/" className="absolute pt-[71px]">
          <div
            className="rounded-full hover:bg-slate-100 hover:shadow-lg inline-flex gap-2 
            text-base font-medium text-start px-5 py-1 transition-all duration-200"
          >
            <House height={25} width={25} />
            <p className="self-center">กลับสู่หน้าหลัก</p>
          </div>
        </Link>
        <div className="my-auto flex px-[5%]">
          <Image
            className="justify-self-center"
            src={"/inline-logo.webp"}
            width={1000}
            height={179}
            alt="login"
            priority
            placeholder="blur" // If using next/image
            blurDataURL="data:image/..." // Base64 tiny placeholder
          />
        </div>
      </div>
      <div className="xl:pt-6 w-full lg:w-[42%] sm:px-0">
        <div
          className="relative drop-shadow-2xl border bg-white xl:rounded-t-[20px] w-full 
          lg:max-w-[538px] h-full mx-auto lg:ml-0"
        >
          <div className="mx-auto mt-[50px] w-[78%] flex flex-col">
            <Link
              className="absolute px-2 py-1 rounded-full hover:bg-slate-100 inline-flex gap-2 top-[30px] left-[30px] lg:hidden hover:cursor-pointer"
              href={"/"}
            >
              <House height={25} width={25} />
              <p className="self-center hidden sm:block">กลับสู่หน้าหลัก</p>
            </Link>
            <p className="text-4xl font-semibold text-center text-orange-dark">
              เข้าสู่ระบบ
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5 mt-[21px]"
            >
              <div>
                <Label className="text-base font-normal" htmlFor="email">
                  อีเมล{" "}
                  {errors.email && (
                    <span className="error-msg">
                      {errors.email.message as string}
                    </span>
                  )}
                </Label>
                <Input
                  {...register("email")}
                  className="auth-input"
                  type="email"
                  id="email"
                  placeholder="อีเมล"
                />
              </div>
              <div>
                <Label className="text-base font-normal" htmlFor="password">
                  รหัสผ่าน{" "}
                  {errors.password && (
                    <span className="error-msg">
                      {errors.password.message as string}
                    </span>
                  )}
                </Label>
                <div className="relative">
                  <Input
                    {...register("password")}
                    className="auth-input "
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="รหัสผ่าน"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={togglePasswordVisibility}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex justify-end">
                <Link
                  href={"/forgot-password"}
                  className="text-sm sm:text-base font-normal underline hover:text-orange-dark text-gray-600"
                >
                  ลืมรหัสผ่าน?
                </Link>
              </div>
              <Button
                className="text-lg font-normal bg-orange-dark hover:bg-orange-normal hover:shadow-md h-[48px]
              rounded-[10px] border"
                type="submit"
                disabled={isSubmitting || isRedirecting}
              >
                เข้าสู่ระบบ
              </Button>
            </form>

            <div className="flex gap-1 justify-center mt-[17px]">
              <p className="font-light">คุณยังไม่เป็นสมาชิกใช่หรือไม่?</p>
              <Link
                href={"/signup"}
                className="text-orange-dark hover:underline "
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
              <button
                onClick={handleGoogleLogin}
                className="inline-flex gap-1 border hover:border-black/30 hover:shadow-md rounded-[10px] 
                h-[48px] w-full text-sm font-normal justify-center items-center"
              >
                <Image
                  src={"/icon/google-icon.svg"}
                  width={33}
                  height={33}
                  alt="google-login"
                />
                เข้าสู่ระบบด้วย Google
              </button>
              {/* <button className="oauth-btn">
                <Image
                  src={"./icon/fb-icon.svg"}
                  width={33}
                  height={33}
                  alt="google-login"
                />
                เข้าสู่ระบบด้วย Facebook
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
