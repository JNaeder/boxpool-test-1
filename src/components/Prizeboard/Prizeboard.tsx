import PrizeboardSquareBox from "./PrizeboardSquareBox";

export default function Prizeboard() {
  return (
    <div className="ml-auto mr-auto flex">
      <div>
        <PrizeboardSquareBox text="1st Quarter" color="blue" />
        <PrizeboardSquareBox text="2nd Quarter" color="green" />
        <PrizeboardSquareBox text="3rd Quarter" color="yellow" />
        <PrizeboardSquareBox text="Final" color="red" />
      </div>
      <div>
        <PrizeboardSquareBox text="5000" />
        <PrizeboardSquareBox text="15000" />
        <PrizeboardSquareBox text="5000" />
        <PrizeboardSquareBox text="50000" />
      </div>
    </div>
  );
}
