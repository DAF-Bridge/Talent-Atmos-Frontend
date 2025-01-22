"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "@/i18n/routing";

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
