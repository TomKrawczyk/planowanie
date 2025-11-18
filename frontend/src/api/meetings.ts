export async function fetchMeetings(filters: any) {
  const params = new URLSearchParams();
  if (filters.date) params.append("date", filters.date);
  if (filters.search) params.append("search", filters.search);
  if (filters.sort) params.append("sort", filters.sort);
  const res = await fetch(`/meetings?${params.toString()}`);
  return res.json();
}

export async function fetchRoute(filters: any) {
  const params = new URLSearchParams();
  if (filters.date) params.append("date", filters.date);
  const res = await fetch(`/route?${params.toString()}`);
  return res.json();
}
