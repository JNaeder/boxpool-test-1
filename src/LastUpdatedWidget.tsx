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
    <div className="bg-black text-white font-bold p-2 rounded-2xl flex justify-center mb-4">
      Last Updated: {formatedDate}
    </div>
  );
}
