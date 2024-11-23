import { formatInternalUrl } from "@/lib/utils";
import JobCarousel from "../carousels/JobCarousel";

// Server component to fetch data
export default async function JobCarouselWrapper() {
  // For server components, it's better to use NEXT_PUBLIC_API_URL for external APIs

  // Ensure we have a properly formatted URL
  const apiUrl = formatInternalUrl("/api/jobs");

  try {
    const res = await fetch(apiUrl, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`API call failed with status: ${res.status}`);
    }

    const data = await res.json();
    return <JobCarousel jobs={data.data} />;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    // You might want to handle the error appropriately
    return <div>Failed to load Jobs</div>;
  }
}
