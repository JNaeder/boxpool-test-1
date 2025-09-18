import type { Boxpool } from "@/types/boxpoolTypes";
import PrizeboardSquareBox from "./PrizeboardSquareBox";

export default function Prizeboard({
  boxpoolData,
  isEditing,
}: {
  boxpoolData: Boxpool;
  isEditing: boolean;
}) {
  const plusTwo: boolean = Boolean(boxpoolData.prizeNumbers.plusTwo);
  const plusFive: boolean = Boolean(boxpoolData.prizeNumbers.plusFive);
  const reverse: boolean = Boolean(boxpoolData.prizeNumbers.reverse);
  // const plusTwo = true;
  // const plusFive = true;
  // const reverse = true;

  return (
    // Max Width??
    <div className="flex p-2 justify-center mx-5">
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
          isEditing={isEditing}
          prizeType={{ quarter: "firstQuarter", winType: "gameScore" }}
        />
        <PrizeboardSquareBox
          text={boxpoolData.prizeNumbers.gameScore.secondQuarter}
          isEditing={isEditing}
          prizeType={{ quarter: "secondQuarter", winType: "gameScore" }}
        />
        <PrizeboardSquareBox
          text={boxpoolData.prizeNumbers.gameScore.thirdQuarter}
          isEditing={isEditing}
          prizeType={{ quarter: "thirdQuarter", winType: "gameScore" }}
        />
        <PrizeboardSquareBox
          text={boxpoolData.prizeNumbers.gameScore.final}
          isEditing={isEditing}
          prizeType={{ quarter: "final", winType: "gameScore" }}
        />
      </div>
      {plusTwo && (
        <div className="flex-1">
          <PrizeboardSquareBox text="+ 2" title />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.firstQuarter}
            isEditing={isEditing}
            prizeType={{ quarter: "firstQuarter", winType: "plusTwo" }}
          />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.secondQuarter}
            isEditing={isEditing}
            prizeType={{ quarter: "secondQuarter", winType: "plusTwo" }}
          />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.thirdQuarter}
            isEditing={isEditing}
            prizeType={{ quarter: "thirdQuarter", winType: "plusTwo" }}
          />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.final}
            isEditing={isEditing}
            prizeType={{ quarter: "final", winType: "plusTwo" }}
          />
        </div>
      )}
      {plusFive && (
        <div className="flex-1">
          <PrizeboardSquareBox text="+ 5" title />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.firstQuarter}
            isEditing={isEditing}
            prizeType={{ quarter: "firstQuarter", winType: "plusFive" }}
          />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.secondQuarter}
            isEditing={isEditing}
            prizeType={{ quarter: "secondQuarter", winType: "plusFive" }}
          />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.thirdQuarter}
            isEditing={isEditing}
            prizeType={{ quarter: "thirdQuarter", winType: "plusFive" }}
          />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.final}
            isEditing={isEditing}
            prizeType={{ quarter: "final", winType: "plusFive" }}
          />
        </div>
      )}
      {reverse && (
        <div className="flex-1">
          <PrizeboardSquareBox text="Reverse" title />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.firstQuarter}
            isEditing={isEditing}
            prizeType={{ quarter: "firstQuarter", winType: "reverse" }}
          />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.secondQuarter}
            isEditing={isEditing}
            prizeType={{ quarter: "secondQuarter", winType: "reverse" }}
          />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.thirdQuarter}
            isEditing={isEditing}
            prizeType={{ quarter: "thirdQuarter", winType: "reverse" }}
          />
          <PrizeboardSquareBox
            text={boxpoolData.prizeNumbers.gameScore.final}
            isEditing={isEditing}
            prizeType={{ quarter: "final", winType: "reverse" }}
          />
        </div>
      )}
    </div>
  );
}
