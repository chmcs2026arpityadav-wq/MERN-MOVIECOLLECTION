export function formatDate(date) {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (isNaN(parsedDate)) return "Invalid Date";

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}