export const formatDate = (dateString: string) => {
  const newDate = new Date(dateString);
  const formatted = newDate.toLocaleString("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  });
  return formatted;
};

export const generateRandom10Numbers = () => {
  const numbers = Array.from({ length: 10 }, (_, i) => i);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
};
