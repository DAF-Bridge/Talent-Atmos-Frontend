"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function OAuthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      // Save the token in localStorage or a secure cookie
      localStorage.setItem("token", token as string);

      // Redirect the user to the home page or any other page
      router.push("/");
    }
  }, [router, searchParams]);

  return <></>;
}
