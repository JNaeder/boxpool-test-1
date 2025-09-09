import type { Game, References, Team } from "./types";
import "./Scoreboard.css";
import CountdownTimer from "./CountdownTimer";

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
      {" "}
      <div className="flex flex-col items-center">
        <div className="flex flex-col">
          {/* <div>{getCurrentQuater()}</div> */}
          <div className="flex">
            <div className="scoreboard-title"></div>
            <div className="scoreboard-title">1</div>
            <div className="scoreboard-title">2</div>
            <div className="scoreboard-title">3</div>
            <div className="scoreboard-title">4</div>
            <div className="scoreboard-title">Total</div>
          </div>
          <div className="flex">
            <div
              className="scoreboard-square"
              style={{
                backgroundColor: awayTeam?.teamColoursHex[0],
                color: "white",
              }}
            >
              {game.schedule.awayTeam.abbreviation}
            </div>
            <div className="scoreboard-square">
              {game.score.quarters[0]?.awayScore}
            </div>
            <div className="scoreboard-square">
              {game.score.quarters[1]?.awayScore}
            </div>
            <div className="scoreboard-square">
              {game.score.quarters[2]?.awayScore}
            </div>
            <div className="scoreboard-square">
              {game.score.quarters[3]?.awayScore}
            </div>
            <div className="scoreboard-square">{game.score.awayScoreTotal}</div>
          </div>
          <div className="flex">
            <div
              className="scoreboard-square"
              style={{
                backgroundColor: homeTeam?.teamColoursHex[0],
                color: "white",
              }}
            >
              {game.schedule.homeTeam.abbreviation}
            </div>
            <div className="scoreboard-square">
              {game.score.quarters[0]?.homeScore}
            </div>
            <div className="scoreboard-square">
              {game.score.quarters[1]?.homeScore}
            </div>
            <div className="scoreboard-square">
              {game.score.quarters[2]?.homeScore}
            </div>
            <div className="scoreboard-square">
              {game.score.quarters[3]?.homeScore}
            </div>
            <div className="scoreboard-square">{game.score.homeScoreTotal}</div>
          </div>
        </div>
        <div className="font-bold text-3xl">{getCurrentQuater()}</div>
        <div className="font-bold text-3xl">{getTimeRemaining()}</div>
      </div>
    </>
  );
}
