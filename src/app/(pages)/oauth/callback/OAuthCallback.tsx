"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function OAuthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      // Save token in cookie
      Cookies.set("authToken", token, {
        expires: 1, // 1 day
        path: "/",
        secure: process.env.NODE_ENV === "production", // HTTPS in production
        sameSite: "strict",
      });

      // Redirect the user to the home page or any other page
      router.push("/");
    }
  }, [router, searchParams]);

  return <></>;
}
