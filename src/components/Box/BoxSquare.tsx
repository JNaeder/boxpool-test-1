import type { WinningScore } from "../../types";

export default function BoxSquare({
  name,
  boxNumber,
  winningNumbers,
  quarterScores,
  period,
  completed,
}: {
  name?: string;
  boxNumber: number;
  winningNumbers: WinningScore;
  quarterScores: WinningScore[];
  period: number | undefined;
  completed: boolean;
}) {
  type ColorState = {
    color: string;
    state: boolean;
  };
  const winColorStates: ColorState[] = [
    {
      color: "blue-400",
      state:
        (period ?? 0) >= 1 || completed
          ? quarterScores[0].homeScore % 10 === winningNumbers.homeScore &&
            quarterScores[0].awayScore % 10 === winningNumbers.awayScore
          : false,
    },
    {
      color: "green-400",
      state:
        (period ?? 0) >= 2 || completed
          ? quarterScores[1].homeScore % 10 === winningNumbers.homeScore &&
            quarterScores[1].awayScore % 10 === winningNumbers.awayScore
          : false,
    },
    {
      color: "yellow-400",
      state:
        (period ?? 0) >= 3 || completed
          ? quarterScores[2].homeScore % 10 === winningNumbers.homeScore &&
            quarterScores[2].awayScore % 10 === winningNumbers.awayScore
          : false,
    },
    {
      color: "red-400",
      state:
        (period ?? 0) >= 4 || completed
          ? quarterScores[3].homeScore % 10 === winningNumbers.homeScore &&
            quarterScores[3].awayScore % 10 === winningNumbers.awayScore
          : false,
    },
  ];

  const winners = winColorStates.filter((state) => state.state);

  // if (winners.length > 0) {
  //   console.log(winners);
  // }

  const getColorString = (): string => {
    if (winners.length == 1) {
      return `!bg-${winners[0].color} font-bold`;
    } else if (winners.length == 2) {
      return `bg-linear-to-br from-${winners[0].color} from-50% to-${winners[1].color} to-50% font-bold`;
    } else {
      return "";
    }
  };

  // console.log(quarterScores, winningNumbers);

  return (
    <div
      className={[
        "w-box h-box border-1 bg-box-bg flex flex-col",
        "hover:bg-amber-200",
        getColorString(),
        // "w-box h-box border-1 bg-box-bg flex flex-col hover:bg-amber-200 bg-linear-to-br from-blue-400 from-50% to-green-400 to-50% font-bold",
        // "bg-linear-to-r from-green-400 from-50% to-red-400 to-50%",
        // firstScoreWin && "!bg-blue-400 font-bold",
        // secondScoreWin && "!bg-green-400 font-bold",
        // thirdScoreWin && "!bg-yellow-400 font-bold",
        // finalScoreWin && "!bg-red-400 font-bold",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="text-[9px] flex flex-col text-right pr-0.5">
        {boxNumber}
      </div>
      <div className="flex justify-center text-sm">{name}</div>
    </div>
  );
}
