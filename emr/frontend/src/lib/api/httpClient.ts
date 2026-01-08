export async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
    ...options,
    credentials: 'include',
  });

  if (!res.ok) {
    // TODO: improve error handling and typing
    throw new Error('API request failed');
  }

  return res.json();
}
