export default function NumberSquare({
  option,
  number,
}: {
  option: "top" | "side";
  number: number;
}) {
  // return <div className={`number-square-${option}`}>{number}</div>;
  if (option == "side") {
    return (
      <div className="content-center text-center w-number-box h-box">
        {number}
      </div>
    );
  } else if (option == "top") {
    return (
      <div className="content-center text-center w-box h-number-box">
        {number}
      </div>
    );
  }
}
