// Booking opens Zenoti Webstore V2 in the same tab, so the phone's back gesture returns to the site.
const BASE = (process.env.NEXT_PUBLIC_ZENOTI_WEBSTORE_URL || "https://booking.texturesstudiosalon.com/webstoreNew").replace(/\/$/, "");
const CENTER = process.env.NEXT_PUBLIC_ZENOTI_CENTER_ID || "REPLACE_WITH_CENTER_ID";

export const bookingUrl = `${BASE}/${CENTER}`;

export function bookServiceUrl(zenotiServiceId: string | null | undefined) {
  return zenotiServiceId ? `${bookingUrl}?serviceid=${encodeURIComponent(zenotiServiceId)}` : bookingUrl;
}
export function bookCategoryUrl(zenotiCategoryId: string | null | undefined) {
  return zenotiCategoryId ? `${bookingUrl}?CategoryId=${encodeURIComponent(zenotiCategoryId)}` : bookingUrl;
}
