/**
 * Amazon Affiliate Engine with Geotargeting & Compliance Helpers
 * Automatically resolves ASIN / URLs to regional Amazon storefronts (US, UK, UAE, CA, DE, AU) with proper associate tags.
 */

export interface AmazonRegionalStore {
  domain: string;
  tag: string;
  name: string;
}

export const AMAZON_REGIONAL_CONFIG: Record<string, AmazonRegionalStore> = {
  US: {
    domain: "amazon.com",
    tag: process.env.AMAZON_TAG_US || process.env.AMAZON_PARTNER_TAG || "zymiit-20",
    name: "Amazon USA",
  },
  GB: {
    domain: "amazon.co.uk",
    tag: process.env.AMAZON_TAG_UK || "zymiit-uk-21",
    name: "Amazon UK",
  },
  AE: {
    domain: "amazon.ae",
    tag: process.env.AMAZON_TAG_AE || "zymiit-ae-21",
    name: "Amazon UAE",
  },
  CA: {
    domain: "amazon.ca",
    tag: process.env.AMAZON_TAG_CA || "zymiit-ca-20",
    name: "Amazon Canada",
  },
  DE: {
    domain: "amazon.de",
    tag: process.env.AMAZON_TAG_DE || "zymiit-de-21",
    name: "Amazon Germany",
  },
  AU: {
    domain: "amazon.com.au",
    tag: process.env.AMAZON_TAG_AU || "zymiit-au-22",
    name: "Amazon Australia",
  },
  DEFAULT: {
    domain: "amazon.com",
    tag: process.env.AMAZON_TAG_DEFAULT || process.env.AMAZON_PARTNER_TAG || "zymiit-20",
    name: "Amazon Global",
  },
};

export const AMAZON_COMPLIANCE_DISCLAIMER =
  "As an Amazon Associate, we earn from qualifying purchases. Prices and availability are accurate as of the date/time indicated and are subject to change.";

/**
 * Builds a compliant, geotargeted Amazon affiliate link from an ASIN or direct URL.
 */
export function buildAffiliateUrl(
  asinOrUrl: string,
  countryCode: string = "US",
  customSubId?: string
): string {
  if (!asinOrUrl) return "https://www.amazon.com";

  const upperCountry = countryCode.toUpperCase();
  const store = AMAZON_REGIONAL_CONFIG[upperCountry] || AMAZON_REGIONAL_CONFIG.DEFAULT;

  // Extract ASIN if it is an ASIN or URL containing /dp/ or /gp/
  const asinMatch =
    asinOrUrl.match(/(?:dp|gp\/product)\/([A-Z0-9]{10})/i) ||
    (asinOrUrl.trim().length === 10 && /^[A-Z0-9]{10}$/i.test(asinOrUrl.trim())
      ? [null, asinOrUrl.trim()]
      : null);

  if (asinMatch && asinMatch[1]) {
    const asin = asinMatch[1].toUpperCase();
    const subParam = customSubId ? `&ascsubtag=${encodeURIComponent(customSubId)}` : "";
    return `https://www.${store.domain}/dp/${asin}?tag=${store.tag}&linkCode=ogi${subParam}`;
  }

  // If already an Amazon link, ensure associate tag is attached/replaced
  try {
    const url = new URL(asinOrUrl);
    if (url.hostname.includes("amazon.")) {
      url.hostname = `www.${store.domain}`;
      url.searchParams.set("tag", store.tag);
      if (customSubId) {
        url.searchParams.set("ascsubtag", customSubId);
      }
      return url.toString();
    }
  } catch {
    // If not a valid URL, return as is
  }

  return asinOrUrl;
}

/**
 * Resolve country from client request headers
 */
export function getCountryFromHeaders(headers: Headers): string {
  return (
    headers.get("x-vercel-ip-country") ||
    headers.get("cf-ipcountry") ||
    headers.get("x-country-code") ||
    headers.get("cloudfront-viewer-country") ||
    "US"
  );
}
