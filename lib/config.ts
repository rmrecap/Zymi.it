const getApiBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "");
  }
  // When running in the browser, an empty string ensures requests resolve relative
  // to window.location.origin (e.g. /api/orders on https://zymi.it)
  // preventing ERR_CONNECTION_REFUSED to localhost:3001 on users' devices.
  if (typeof window !== "undefined") {
    return "";
  }
  // During server-side rendering, use NEXTAUTH_URL or empty string
  return (process.env.NEXTAUTH_URL || "").replace(/\/$/, "");
};

const config = {
  get apiBaseUrl() {
    return getApiBaseUrl();
  },
  nextAuthUrl: process.env.NEXTAUTH_URL || "http://localhost:3000",
};

export default config;

