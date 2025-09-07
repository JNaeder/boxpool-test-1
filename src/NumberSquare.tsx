export default function NumberSquare({
  option,
  number,
}: {
  option: "top" | "side";
  number: string;
}) {
  return <div className={`number-square-${option}`}>{number}</div>;
}
