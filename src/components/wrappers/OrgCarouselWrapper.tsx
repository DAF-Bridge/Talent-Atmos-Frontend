import OrgCarousel from "../carousels/OrgCarousel";

// Server component to fetch data
export default async function OrgCarouselWrapper() {
  const res = await fetch("http://localhost:3000/api/orgs", {
    cache: "no-cache",
  });
  const data = await res.json();

  return <OrgCarousel orgs={data.data} />;
}
