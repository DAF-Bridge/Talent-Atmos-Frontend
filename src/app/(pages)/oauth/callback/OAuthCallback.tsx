"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { CookieExpiresDay } from "../../../../../config/config";
import { useAuth } from "@/context/AuthContext";

export default function OAuthCallbackPage() {
  const { setAuthState } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get("token");

      if (token) {
        // set cookie

        // Create a promise that resolves when the cookie is set
        await new Promise<void>((resolve) => {
          Cookies.set("authToken", token, {
            expires: CookieExpiresDay,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });

          // Verify the cookie was set successfully
          const savedToken = Cookies.get("authToken");
          if (savedToken === token) {
            resolve();
          }
        });

        // set auth state
        setAuthState();

        // Redirect the user to the home page or any other page
        router.push("/");
      }
    };
    handleCallback();
  }, [router, searchParams, setAuthState]);

  return <></>;
}
