const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

export function apiUrl(path: string) {
  const normalisedPath = path.startsWith("/") ? path : `/${path}`;
  return `${apiBaseUrl}${normalisedPath}`;
}
