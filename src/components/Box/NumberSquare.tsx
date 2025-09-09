export default function NumberSquare({
  option,
  number,
}: {
  option: "top" | "side";
  number: number;
}) {
  if (option == "side") {
    return (
      <div className="content-center text-center w-number-box h-box border-black border-1">
        {number}
      </div>
    );
  } else if (option == "top") {
    return (
      <div className="content-center text-center w-box h-number-box border-black border-1">
        {number}
      </div>
    );
  }
}
