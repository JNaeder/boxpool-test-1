import type { Game, References, Team } from "../../types";
import CountdownTimer from "./CountdownTimer";
import ScoreboardTitleBox from "./ScoreboardTitleBox";
import ScoreboardSquareBox from "./ScoreboardSquareBox";

export default function Scoreboard({
  game,
  references,
}: {
  game: Game;
  references: References;
}) {
  const homeTeam: Team | undefined = references.teamReferences.find(
    (team) => team.id == game.schedule.homeTeam.id
  );

  const awayTeam: Team | undefined = references.teamReferences.find(
    (team) => team.id == game.schedule.awayTeam.id
  );

  const getCurrentQuater = (): React.ReactNode | string => {
    if (game.schedule.playedStatus === "UNPLAYED") {
      return <CountdownTimer targetDate={game.schedule.startTime} />;
    } else if (
      game.schedule.playedStatus === "COMPLETED" ||
      game.schedule.playedStatus == "COMPLETED_PENDING_REVIEW"
    ) {
      return "Final";
    } else if (game.score.currentQuarter) {
      switch (game.score.currentQuarter) {
        case 1:
          return "1st Quarter";
        case 2:
          return "2nd Quarter";
        case 3:
          return "3rd Quarter";
        case 4:
          return "4th Quarter";
        default:
          return "";
      }
    } else if (game.score.currentIntermission) {
      switch (game.score.currentIntermission) {
        case 1:
          return "End 1";
        case 2:
          return "Halftime";
        case 3:
          return "End 3";
        case 4:
          return "Final";
        default:
          return "";
      }
    } else {
      return "";
    }
  };
  const getTimeRemaining = (): string => {
    if (!game.score.currentQuarterSecondsRemaining) {
      return "";
    }
    const total_sec = game.score.currentQuarterSecondsRemaining;
    const minutes = Math.floor(total_sec / 60);
    const seconds = total_sec % 60;
    return String(minutes) + ":" + String(seconds).padStart(2, "0");
  };
  return (
    <>
      <div className="flex flex-col items-center mb-4">
        <div className="flex flex-col">
          <div className="flex">
            <ScoreboardTitleBox text="" />
            <ScoreboardTitleBox text="1" />
            <ScoreboardTitleBox text="2" />
            <ScoreboardTitleBox text="3" />
            <ScoreboardTitleBox text="4" />
            <ScoreboardTitleBox text="Total" />
          </div>
          <div className="flex">
            <ScoreboardSquareBox
              text={game.schedule.awayTeam.abbreviation}
              color={awayTeam?.teamColoursHex[0]}
            />
            <ScoreboardSquareBox text={game.score.quarters[0]?.awayScore} />
            <ScoreboardSquareBox text={game.score.quarters[1]?.awayScore} />
            <ScoreboardSquareBox text={game.score.quarters[2]?.awayScore} />
            <ScoreboardSquareBox text={game.score.quarters[3]?.awayScore} />
            <ScoreboardSquareBox text={game.score.awayScoreTotal} />
          </div>
          <div className="flex">
            <ScoreboardSquareBox
              text={game.schedule.homeTeam.abbreviation}
              color={homeTeam?.teamColoursHex[0]}
            />
            <ScoreboardSquareBox text={game.score.quarters[0]?.homeScore} />
            <ScoreboardSquareBox text={game.score.quarters[1]?.homeScore} />
            <ScoreboardSquareBox text={game.score.quarters[2]?.homeScore} />
            <ScoreboardSquareBox text={game.score.quarters[3]?.homeScore} />
            <ScoreboardSquareBox text={game.score.homeScoreTotal} />
          </div>
        </div>
        <div className="mt-3">
          <div className="font-bold text-3xl">{getTimeRemaining()}</div>
          <div className="font-bold text-3xl">{getCurrentQuater()}</div>
        </div>
      </div>
    </>
  );
}
