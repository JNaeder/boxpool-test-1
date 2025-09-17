export default function NumberSquare({
  option,
  number,
}: {
  option: "top" | "side";
  number: number;
}) {
  if (option == "side") {
    return (
      <div className="content-center text-center border-black border-1 text-2xl">
        {number}
      </div>
    );
  } else if (option == "top") {
    return (
      <div className="content-center text-center border-black border-1 text-2xl">
        {number}
      </div>
    );
  }
}
