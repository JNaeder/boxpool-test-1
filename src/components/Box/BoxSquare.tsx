import type { WinningScore } from "../../types";

export default function BoxSquare({
  name,
  boxNumber,
  winningNumbers,
  quarterScores,
  period,
}: {
  name?: string;
  boxNumber: number;
  winningNumbers: WinningScore;
  quarterScores: WinningScore[];
  period: number;
}) {
  const firstScoreWin =
    period >= 1
      ? quarterScores[0].homeScore % 10 === winningNumbers.homeScore &&
        quarterScores[0].awayScore % 10 === winningNumbers.awayScore
      : false;

  const secondScoreWin =
    period >= 2
      ? quarterScores[1].homeScore % 10 === winningNumbers.homeScore &&
        quarterScores[1].awayScore % 10 === winningNumbers.awayScore
      : false;

  const thirdScoreWin =
    period >= 3
      ? quarterScores[2].homeScore % 10 === winningNumbers.homeScore &&
        quarterScores[2].awayScore % 10 === winningNumbers.awayScore
      : false;

  const finalScoreWin =
    period >= 4
      ? quarterScores[3].homeScore % 10 === winningNumbers.homeScore &&
        quarterScores[3].awayScore % 10 === winningNumbers.awayScore
      : false;

  return (
    <div
      className={[
        "w-box h-box border-1 bg-box-bg flex flex-col",
        "hover:!bg-amber-200",
        // "bg-linear-to-r from-red-400",
        firstScoreWin && "!bg-blue-400 font-bold",
        secondScoreWin && "!bg-green-400 font-bold",
        thirdScoreWin && "!bg-yellow-400 font-bold",
        finalScoreWin && "!bg-red-400 font-bold",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="text-[9px] flex flex-col text-right pr-0.5">
        {boxNumber}
      </div>
      <div className="flex justify-center">{name}</div>
    </div>
  );
}

// isWinning={
//                               homeTeamScore.at(-1) == topRowNumbers[j] &&
//                               awayTeamScore.at(-1) == sideRowNumbers[i]
//                             }
