"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm, type FieldValues, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, TSignUpSchema } from "@/lib/types";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success("ลงทะเบียนสําเร็จ");
      return;
    }

    // if the response if ok, the process ends here
    //------ below is for error ---------

    const responseData = await response.json();

    if (responseData.errors) {
      toast.error("ข้อมูลที่กรอกไม่ถูกต้อง");
      Object.entries(responseData.errors).forEach(([key, message]) => {
        setError(key as keyof TSignUpSchema, {
          type: "server",
          message: message as string,
        });
      });
    }
  };

  return (
    <div className="font-prompt lg:overflow-hidden h-full sm:h-[100vh]">
      <Toaster />
      <form
        className="relative flex flex-col items-center gap-3 sm:gap-5 w-full lg:max-w-[914px] bg-white drop-shadow-2xl h-full
        lg:rounded-t-[20px] mx-auto lg:mt-[43px] px-[50px] md:px-[84px] "
        onSubmit={handleSubmit(onSubmit)}
      >
        <Link
          className="absolute px-2 py-1 rounded-full hover:bg-slate-100 inline-flex gap-1 top-[20px] left-[20px] 
          hover:cursor-pointer"
          href={"/"}
        >
          <ArrowLeft height={30} width={30} />
          <p className="self-center hidden sm:block">กลับสู่หน้าหลัก</p>
        </Link>
        <p className="text-3xl sm:text-4xl font-semibold text-center text-orange-dark mt-8 md:mt-[50px] lg:mt-[34px]">
          สมัครสมาชิก
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-4 sm:gap-[26px]">
          <InputField
            label="ชื่อจริง"
            id="firstName"
            type="text"
            placeholder="ชื่อจริง"
            register={register}
            errors={errors}
          />

          <InputField
            label="นามสกุล"
            id="lastName"
            type="text"
            placeholder="นามสกุล"
            register={register}
            errors={errors}
          />
        </div>
        <InputField
          label="อีเมล"
          id="email"
          type="email"
          placeholder="example@gmail.com"
          register={register}
          errors={errors}
        />
        <InputField
          label="เบอร์โทรศัพท์"
          id="phone"
          type="text"
          placeholder="0812345678"
          register={register}
          errors={errors}
        />
        <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-4 sm:gap-[26px]">
          <InputField
            label="รหัสผ่าน"
            id="password"
            type="password"
            placeholder="รหัสผ่าน"
            register={register}
            errors={errors}
          />
          <InputField
            label="ยืนยันรหัสผ่าน"
            id="confirmPassword"
            type="password"
            placeholder="ยืนยันรหัสผ่าน"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex flex-col w-full mb-[60px]">
          <div className="inline-flex gap-1 w-full justify-center sm:justify-start items-center self-start mt-2 sm:mt-0">
            <input
              type="checkbox"
              className="w-4 h-4 accent-black"
              {...register("policies")}
              id="policies"
            />
            <Label
              className="hover:cursor-pointer font-light text-sm sm:text-base"
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
          {errors.policies && (
            <span className="error-msg self-center sm:self-start sm:pl-2">
              {errors.policies.message as string}
            </span>
          )}
          <div className="flex flex-col w-full gap-[20px]">
            <Button
              className="self-center sm:self-end mt-5 sm:mt-0 text-lg font-normal bg-orange-dark 
              hover:bg-orange-normal hover:shadow-md h-[40px] sm:h-[46px] rounded-[10px] w-full sm:w-[150px]"
              type="submit"
              disabled={isSubmitting}
            >
              ยืนยัน
            </Button>
            <div className="flex self-center sm:self-end ">
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
      </form>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  id: keyof TSignUpSchema;
  type: string;
  placeholder: string;
  register: UseFormRegister<TSignUpSchema>;
  errors: FieldValues;
}

const InputField = React.memo(
  ({ label, id, type, placeholder, register, errors }: InputFieldProps) => {
    return (
      <div className="relative w-full">
        <Label className="text-base font-normal" htmlFor={id}>
          {label}{" "}
          {errors[id] && (
            <span className="error-msg">{errors[id]?.message as string}</span>
          )}
        </Label>
        <Input
          {...register(id)}
          className="auth-input"
          type={type}
          id={id}
          placeholder={placeholder}
        />
      </div>
    );
  }
);

// Set the display name for better debugging
InputField.displayName = "InputField";
