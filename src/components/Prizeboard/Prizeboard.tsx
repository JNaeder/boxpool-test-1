import type { Boxpool } from "@/types";
import PrizeboardSquareBox from "./PrizeboardSquareBox";

export default function Prizeboard({ boxpoolData }: { boxpoolData: Boxpool }) {
  return (
    <div className="ml-auto mr-auto flex">
      <div>
        <PrizeboardSquareBox text="1st Quarter" color="blue" />
        <PrizeboardSquareBox text="2nd Quarter" color="green" />
        <PrizeboardSquareBox text="3rd Quarter" color="yellow" />
        <PrizeboardSquareBox text="Final" color="red" />
      </div>
      <div>
        <PrizeboardSquareBox
          text={boxpoolData.prizeNumbers.gameScore.firstQuarter}
        />
        <PrizeboardSquareBox
          text={boxpoolData.prizeNumbers.gameScore.secondQuarter}
        />
        <PrizeboardSquareBox
          text={boxpoolData.prizeNumbers.gameScore.thirdQuarter}
        />
        <PrizeboardSquareBox text={boxpoolData.prizeNumbers.gameScore.final} />
      </div>
    </div>
  );
}
