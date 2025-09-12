export default function ScoreboardSquareBox({
  text,
  color = "white",
}: {
  text: string | number | null | undefined;
  color?: string;
}) {
  return (
    <div
      style={{ backgroundColor: color }}
      className={`border-1 border-black w-score-box-width h-score-box-height flex justify-center items-center text-lg text-${
        color == "white" ? "black" : "white"
      }`}
    >
      {text}
    </div>
  );
}
