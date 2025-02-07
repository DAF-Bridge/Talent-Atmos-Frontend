import { useAuth } from "@/context/AuthContext";
import { useRouter } from "@/i18n/routing";
import { formatInternalUrl } from "@/lib/utils";
import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import React from "react";

export default function GoogleLoginBtn() {
  const { setAuthState } = useAuth();
  const router = useRouter();
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (tokenResponse) => {
      // console.log(tokenResponse);
      const apiUrl = formatInternalUrl(
        "/api/auth/google-callback?code=" + tokenResponse.code
      );
      const res = await fetch(apiUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // const token = await res.json();
      // console.log("token: "+token);
      if (res.ok) {
        setAuthState();
        router.push("/");
      } else {
        console.log("Golang Callback Failed");
      }
    },
    onError: (error) => {
      console.log("Login Flow Failed");
      console.log(error);
    },
  });
  return (
    // <GoogleLogin
    //   onSuccess={(credentialResponse) => {
    //     console.log(credentialResponse);
    //   }}
    //   onError={() => {
    //     console.log("Login Failed");
    //   }}
    //   size="large"
    // />
    <button
      onClick={() => login()}
      className="inline-flex gap-2 border hover:border-black/30 hover:shadow-md rounded-[10px]
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
  );
}
