import { formatInternalUrl } from "@/lib/utils";
import OrgCarousel from "../carousels/OrgCarousel";

// Server component to fetch data
export default async function OrgCarouselWrapper() {
  // For server components, it's better to use NEXT_PUBLIC_API_URL for external APIs

  // Ensure we have a properly formatted URL
  const apiUrl = formatInternalUrl("/api/orgs");

  try {
    const res = await fetch(apiUrl, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`API call failed with status: ${res.status}`);
    }

    const data = await res.json();
    return <OrgCarousel orgs={data.data} />;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    // You might want to handle the error appropriately
    return <div>Failed to load organization</div>;
  }
}
