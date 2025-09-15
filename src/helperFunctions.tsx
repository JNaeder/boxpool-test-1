export const formatDate = (dateString: string) => {
  const newDate = new Date(dateString);
  const formatted = newDate.toLocaleString("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  });
  return formatted;
};
