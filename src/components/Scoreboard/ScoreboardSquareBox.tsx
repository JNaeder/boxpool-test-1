export default function ScoreboardSquareBox({
  text,
  color = "white",
  image,
}: {
  text?: string | number | null | undefined;
  color?: string;
  image?: string;
}) {
  return (
    <>
      {image ? (
        <>
          <div
            className={`w-score-box-width h-score-box-height flex justify-center items-center text-lg text-${
              color == "white" ? "black" : "white"
            }`}
          >
            <img
              src={image}
              width={40}
              style={{
                filter: color === "white" ? "invert(0)" : "invert(1)",
              }}
            />
          </div>
        </>
      ) : (
        <>
          <div
            style={{ backgroundColor: color }}
            className={`border-1 border-black w-score-box-width h-score-box-height flex justify-center items-center text-lg text-${
              color == "white" ? "black" : "white"
            }`}
          >
            {text}
          </div>
        </>
      )}
    </>
  );
}
