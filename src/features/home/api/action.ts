"use server";

import { formatExternalUrl } from "@/lib/utils";

export async function getRecentJobs() {
  const apiUrl = formatExternalUrl("/orgs/jobs/jobs-paginate");
  const res = await fetch(apiUrl, { cache: "no-store" });
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    return null;
  }
}

export async function getRecentOrgs() {
  const apiUrl = formatExternalUrl("/orgs-paginate");
  const res = await fetch(apiUrl, { cache: "no-store" });
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    return null;
  }
}

export async function getFeaturedEvents() {
  const apiUrl = formatExternalUrl("/events-paginate");
  const res = await fetch(apiUrl, { cache: "no-store" });
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    return null;
  }
}

export async function getRecommendedEvents() {
  const apiUrl = formatExternalUrl("/recommendation");
  const res = await fetch(apiUrl, { cache: "no-store" });
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    return null;
  }
}
