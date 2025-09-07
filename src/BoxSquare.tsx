export default function BoxSquare({
  name,
  boxNumber,
  isWinning,
}: {
  name?: string;
  boxNumber: number;
  isWinning: boolean;
}) {
  return (
    <div className={`box-square ${isWinning ? "box-winning" : ""}`}>
      {/* {name} */}
      <div className="box-square-number">{boxNumber}</div>
      <div className="box-square-name">{name}</div>
    </div>
  );
}
