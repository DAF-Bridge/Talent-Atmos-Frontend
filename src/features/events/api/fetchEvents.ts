import { Event } from "@/lib/types";
import { formatInternalUrl } from "@/lib/utils";

export interface FetchEventsResponse {
  events: Event[];
  totalEvents: number;
}

interface FetchEventsParams {
  page: string;
  search?: string;
  category?: string;
  dateRange?: string;
  location?: string;
  audience?: string;
  price?: string;
  maxEventsPerPage?: number;
}

export async function fetchEvents({
  page,
  search,
  category,
  dateRange,
  location,
  audience,
  price,
  maxEventsPerPage,
}: FetchEventsParams): Promise<FetchEventsResponse> {
  const apiUrl = formatInternalUrl(
    `/api/events-paginate?page=${page}&offset=${
      maxEventsPerPage?.toString() ?? ""
    }&search=${search ?? ""}&category=${category ?? ""}&dateRange=${
      dateRange ?? ""
    }&location=${location ?? ""}&audience=${audience ?? ""}&price=${
      price ?? ""
    }`
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
