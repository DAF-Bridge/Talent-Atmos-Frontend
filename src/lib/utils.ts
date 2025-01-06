import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
  const baseUrl = process.env.NEXT_PUBLIC_GO_API_URL;

  // Ensure we have a properly formatted URL
  const apiUrl = new URL(url, baseUrl).toString();
  return apiUrl;
}

export function formatRelativeTime(dateTime: string) {
  const now = new Date();
  const inputTime = new Date(dateTime);

  // If the input is not a valid date, return the input as is
  if (isNaN(inputTime.getTime())) {
    return dateTime;
  }

  const diffInMs = now.getTime() - inputTime.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} วินาทีที่แล้ว`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} นาทีที่แล้ว`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ชั่วโมงที่แล้ว`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return "yesterday";
  } else if (diffInDays < 7) {
    return `${diffInDays} วันที่แล้ว`;
  }

  // Beyond 7 days, return the actual date-time string
  return inputTime.toLocaleString("th-TH", { dateStyle: "long" });
}

