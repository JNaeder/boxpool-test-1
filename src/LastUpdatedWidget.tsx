import "./LastUpdatedWidget.css";

export default function LastUpdatedWidget({
  lastUpdated,
}: {
  lastUpdated: string;
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const estString = date.toLocaleString("en-US", {
      timeZone: "America/New_York", // EST/EDT depending on daylight saving
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return estString;
  };
  const formatedDate = formatDate(lastUpdated);

  return (
    <div className="last-updated-container">Last Updated: {formatedDate}</div>
  );
}
