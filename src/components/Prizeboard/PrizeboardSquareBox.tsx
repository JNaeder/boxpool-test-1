export default function PrizeboardSquareBox({
  text,
  color = "white",
}: {
  text: string;
  color?: string;
}) {
  return (
    <div
      className={`${
        color === "green"
          ? "bg-green-400"
          : color === "blue"
          ? "bg-blue-400"
          : color === "red"
          ? "bg-red-400"
          : color === "yellow"
          ? "bg-yellow-400"
          : "bg-white"
      } w-[100px] h-[30px] border-black border flex justify-center items-center`}
    >
      {text}
    </div>
  );
}
