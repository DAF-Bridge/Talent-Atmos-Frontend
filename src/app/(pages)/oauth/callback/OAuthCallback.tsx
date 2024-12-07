"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { setCookie } from "@/lib/utils";

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
        await setCookie(token);

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
