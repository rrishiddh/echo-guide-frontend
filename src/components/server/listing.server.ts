/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListingQuery } from "@/src/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllListingsServer(query: ListingQuery) {
  const params = new URLSearchParams(query as any).toString();

  const res = await fetch(`${API_URL}/listings?${params}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("LISTINGS FETCH FAILED:", {
      status: res.status,
      statusText: res.statusText,
      body: text,
      url: `${API_URL}/listings?${params}`,
    });

    throw new Error("Failed to fetch listings");
  }

  const json = await res.json();
  return { listings: json.data, meta: json.meta };
}


export async function getListingServer(id: string) {
  const res = await fetch(`${API_URL}/listings/${id}`, {
    cache: "no-store", 
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("LISTING FETCH FAILED:", {
      status: res.status,
      statusText: res.statusText,
      body: text,
      url: `${API_URL}/listings/${id}`,
    });

    return null;
  }

  const json = await res.json();
  return json.data; 
}