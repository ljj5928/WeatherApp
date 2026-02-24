export function timeAgo(pubDate, timezone = "UTC") {
  if (!pubDate) return "";

  const isoString = pubDate.replace(" ", "T") + (timezone === "UTC" ? "Z" : "");
  const published = new Date(isoString);
 
  return published.toLocaleDateString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
  });   
}