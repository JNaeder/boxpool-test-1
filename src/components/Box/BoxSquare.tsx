import type { Game, WinningScore } from "../../types";

export default function BoxSquare({
  game,
  name,
  boxNumber,
  winningNumbers,
  quarterScores,
}: {
  game: Game;
  name?: string;
  boxNumber: number;
  winningNumbers: WinningScore;
  quarterScores: WinningScore[];
}) {
  const firstScoreWin =
    quarterScores.length >= 1 && game.Has1stQuarterStarted
      ? quarterScores[0].homeScore % 10 === winningNumbers.homeScore &&
        quarterScores[0].awayScore % 10 === winningNumbers.awayScore
      : false;

  const secondScoreWin =
    quarterScores.length >= 2 && game.Has2ndQuarterStarted
      ? quarterScores[1].homeScore % 10 === winningNumbers.homeScore &&
        quarterScores[1].awayScore % 10 === winningNumbers.awayScore
      : false;

  const thirdScoreWin =
    quarterScores.length >= 3 && game.Has3rdQuarterStarted
      ? quarterScores[2].homeScore % 10 === winningNumbers.homeScore &&
        quarterScores[2].awayScore % 10 === winningNumbers.awayScore
      : false;

  const finalScoreWin =
    quarterScores.length >= 4 && game.Has4thQuarterStarted
      ? quarterScores[3].homeScore % 10 === winningNumbers.homeScore &&
        quarterScores[3].awayScore % 10 === winningNumbers.awayScore
      : false;

  return (
    <div
      className={[
        "w-box h-box border-1 bg-box-bg flex flex-col",
        "hover:!bg-amber-200",
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
