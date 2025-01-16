"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function OAuthCallbackPage() {
  const { setAuthState } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      router.push("/");
    };
    handleCallback();
  }, [router, searchParams, setAuthState]);

  return <></>;
}
