import JobCarousel from "../carousels/JobCarousel";

// Server component to fetch data
export default async function JobCarouselWrapper() {
  // For server components, it's better to use NEXT_PUBLIC_API_URL for external APIs
  // or use absolute URL with the APP_URL for internal API routes
  const baseUrl =
    process.env.NEXT_PUBLIC_DEV_URL || process.env.NEXT_PUBLIC_API_URL;

  // Ensure we have a properly formatted URL
  const apiUrl = new URL("/api/jobs", baseUrl).toString();

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
