import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatInternalUrl(url: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Ensure we have a properly formatted URL
  const apiUrl = new URL(url, baseUrl).toString();
  return apiUrl;
}

export function formatExternalUrl(url: string) {
  const baseUrl = process.env.GO_API_URL;

  // Ensure we have a properly formatted URL
  const apiUrl = new URL(url, baseUrl).toString();
  return apiUrl;
}

export async function setCookie(token : string) {
  const CookieExpiresDay = 1; // 1 day
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
}
