export default function PrizeboardSquareBox({
  text,
  color = "white",
  title = false,
  rowTitle = false,
}: {
  text: string;
  color?: string;
  title?: boolean;
  rowTitle?: boolean;
}) {
  const rowHeight: number = 40;
  return (
    <>
      {title ? (
        <>
          <div
            style={{ height: rowHeight }}
            className={`flex justify-center items-end text-sm font-bold text-center w-full`}
          >
            {text}
          </div>
        </>
      ) : rowTitle ? (
        <>
          <div
            style={{ height: rowHeight }}
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
            } border-black border flex justify-center items-center text-center text-sm font-bold w-full`}
          >
            {text}
          </div>
        </>
      ) : (
        <>
          <div
            style={{ height: rowHeight }}
            className={
              "bg-white border-black border flex justify-center items-center text-center text-sm w-full"
            }
          >
            {text}
          </div>
        </>
      )}
    </>
  );
}
