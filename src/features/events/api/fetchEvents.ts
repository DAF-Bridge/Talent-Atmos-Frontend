import { Event } from "@/lib/types";
import { formatExternalUrl } from "@/lib/utils";

export interface FetchEventsResponse {
  events: Event[];
  totalEvents: number;
}

interface FetchEventsParams {
  orgId?: number;
  page: string;
  query?: string;
  category?: string;
  dateRange?: string;
  location?: string;
  audience?: string;
  price?: string;
  maxEventsPerPage?: number;
}

export async function fetchEvents({
  orgId,
  page,
  query,
  category,
  dateRange,
  location,
  audience,
  price,
  maxEventsPerPage,
}: FetchEventsParams): Promise<FetchEventsResponse> {
  const params = new URLSearchParams();

  if (orgId) params.append("orgId", orgId.toString());
  if (page) params.append("page", page.toString());
  if (maxEventsPerPage) params.append("offset", maxEventsPerPage.toString());
  if (query) params.append("q", query);
  if (category) params.append("category", category);
  if (dateRange) params.append("dateRange", dateRange);
  if (location) params.append("location", location);
  if (audience) params.append("audience", audience);
  if (price) params.append("price", price);

  const apiUrl = formatExternalUrl(
    `/events-paginate/search${params.toString() ? "?" + params.toString() : ""}`
  );

  try {
    const response = await fetch(apiUrl, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    return {
      events: data.events,
      totalEvents: data.total_events,
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      events: [],
      totalEvents: 0,
    };
  }
}
