import { formatInternalUrl } from "@/lib/utils";
import EventCarousel from "../carousels/EventCarousel";

// Server component to fetch data
export default async function RecentEventCarouselWrapper() {
  // For server components, it's better to use NEXT_PUBLIC_API_URL for external APIs

  const apiUrl = formatInternalUrl("/api/events/recent-event");

  try {
    const res = await fetch(apiUrl, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`API call failed with status: ${res.status}`);
    }

    const data = await res.json();
    return <EventCarousel events={data.data} />;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    // You might want to handle the error appropriately
    return <div>Failed to load events</div>;
  }
}
