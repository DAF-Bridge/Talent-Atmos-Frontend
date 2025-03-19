"use server";

import { CategoryProps } from "@/lib/types";
import { formatExternalUrl } from "@/lib/utils";

export async function ListCategories() {
  const apiUrl = formatExternalUrl(`/events/categories/list`);
  const res = await fetch(apiUrl, { cache: "no-store" });
  const data = await res.json();
  const categories: { value: number; label: string }[] = data.categories;

  if (res.ok) {
    return categories;
  } else {
    return [];
  }
}

export async function SubmitPreferences(categories: CategoryProps[]) {
  const apiUrl = formatExternalUrl("/users/user-preference");
  console.log(JSON.stringify({ categories }));
  const res = await fetch(apiUrl, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify({ categories }),
  });

  const data = await res.json();

  if (res.ok) {
    return { success: true, message: data.message, status: res.status };
  } else {
    return { success: false, error: data.error, status: res.status };
  }
}
