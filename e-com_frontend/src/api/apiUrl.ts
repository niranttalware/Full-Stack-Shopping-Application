const rawBaseUrl = (process.env.REACT_APP_API_URL ?? "").trim();
const baseUrl = rawBaseUrl.replace(/\/+$/, "");

if (typeof window !== "undefined") {
  const hostname = window.location.hostname;
  const runningLocally =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0";
  const baseIsLoopback = /(^|\/\/)(localhost|127\.0\.0\.1|0\.0\.0\.0)(:|\/|$)/i.test(
    baseUrl,
  );

  if (!runningLocally && baseIsLoopback) {
    // eslint-disable-next-line no-console
    console.error(
      `[config] REACT_APP_API_URL is set to a loopback address (${baseUrl}). ` +
        `This cannot work on Vercel/production. Set REACT_APP_API_URL to your deployed backend URL.`,
    );
  }
}

export function apiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return baseUrl ? `${baseUrl}${normalizedPath}` : normalizedPath;
}
