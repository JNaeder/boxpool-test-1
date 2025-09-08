export default function NumberSquare({
  option,
  number,
}: {
  option: "top" | "side";
  number: number;
}) {
  return <div className={`number-square-${option}`}>{number}</div>;
}
