import type { Boxpool } from "@/types";
import PrizeboardSquareBox from "./PrizeboardSquareBox";

export default function Prizeboard({ boxpoolData }: { boxpoolData: Boxpool }) {
  const plusTwo: boolean = Boolean(boxpoolData.prizeNumbers.plusTwo);
  const plusFive: boolean = Boolean(boxpoolData.prizeNumbers.plusFive);
  const reverse: boolean = Boolean(boxpoolData.prizeNumbers.reverse);
  // const plusTwo = true;
  // const plusFive = true;
  // const reverse = true;

  return (
    <div className="flex mx-auto p-2 w-3/4 justify-center">
      <div className="flex-1">
        <PrizeboardSquareBox text="" title rowTitle />
        <PrizeboardSquareBox text="1st Quarter" color="blue" rowTitle />
        <PrizeboardSquareBox text="2nd Quarter" color="green" rowTitle />
        <PrizeboardSquareBox text="3rd Quarter" color="yellow" rowTitle />
        <PrizeboardSquareBox text="Final" color="red" rowTitle />
      </div>
      <div className="flex-1">
        <PrizeboardSquareBox text="Game Score" title />
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
      {plusTwo && (
        <div className="flex-1">
          <PrizeboardSquareBox text="+ 2" title />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.firstQuarter}
          />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.secondQuarter}
          />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.thirdQuarter}
          />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.final}
          />
        </div>
      )}
      {plusFive && (
        <div className="flex-1">
          <PrizeboardSquareBox text="+ 5" title />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.firstQuarter}
          />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.secondQuarter}
          />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.thirdQuarter}
          />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.final}
          />
        </div>
      )}
      {reverse && (
        <div className="flex-1">
          <PrizeboardSquareBox text="Reverse" title />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.firstQuarter}
          />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.secondQuarter}
          />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.thirdQuarter}
          />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.final}
          />
        </div>
      )}
    </div>
  );
}
