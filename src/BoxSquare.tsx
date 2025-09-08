import type { WinningScore } from "./types";

export default function BoxSquare({
  name,
  boxNumber,
  winningNumbers,
  quarterScores,
}: {
  name?: string;
  boxNumber: number;
  winningNumbers: WinningScore;
  quarterScores: WinningScore[];
}) {
  const firstScoreWin =
    quarterScores.length >= 1
      ? quarterScores[0].homeScore % 10 === winningNumbers.homeScore &&
        quarterScores[0].awayScore % 10 === winningNumbers.awayScore
      : false;

  const secondScoreWin =
    quarterScores.length >= 2
      ? quarterScores[1].homeScore % 10 === winningNumbers.homeScore &&
        quarterScores[1].awayScore % 10 === winningNumbers.awayScore
      : false;

  const thirdScoreWin =
    quarterScores.length >= 3
      ? quarterScores[2].homeScore % 10 === winningNumbers.homeScore &&
        quarterScores[2].awayScore % 10 === winningNumbers.awayScore
      : false;

  const finalScoreWin =
    quarterScores.length >= 4
      ? quarterScores[3].homeScore % 10 === winningNumbers.homeScore &&
        quarterScores[3].awayScore % 10 === winningNumbers.awayScore
      : false;

  return (
    <div
      className={[
        "box-square",
        firstScoreWin && "box-first-winning",
        secondScoreWin && "box-second-winning",
        thirdScoreWin && "box-third-winning",
        finalScoreWin && "box-final-winning",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="box-square-number">{boxNumber}</div>
      <div className="box-square-name">{name}</div>
    </div>
  );
}

// isWinning={
//                               homeTeamScore.at(-1) == topRowNumbers[j] &&
//                               awayTeamScore.at(-1) == sideRowNumbers[i]
//                             }
