import EventCarousel from "../carousels/EventCarousel";

// Server component to fetch data
export default async function RecentEventCarouselWrapper() {
  const res = await fetch("http://localhost:3000/api/events", {
    cache: "no-cache",
  });
  const data = await res.json();

  return <EventCarousel events={data.data} />;
}
