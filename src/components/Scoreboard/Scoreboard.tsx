import { teamData } from "../../data";
import type { Game, Team } from "../../types";
import CountdownTimer from "./CountdownTimer";
import ScoreboardTitleBox from "./ScoreboardTitleBox";
import ScoreboardSquareBox from "./ScoreboardSquareBox";

export default function Scoreboard({ game }: { game: Game }) {
  const homeTeam: Team | undefined = teamData.find(
    (team) => team.TeamID === game.HomeTeamID
  );

  const awayTeam: Team | undefined = teamData.find(
    (team) => team.TeamID === game.AwayTeamID
  );

  const getCurrentQuater = (): React.ReactNode | string => {
    if (game.Status === "Scheduled") {
      return <CountdownTimer targetDate={game.Date} />;
    } else {
      return game.QuarterDescription;
    }
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
              text={game.AwayTeam}
              color={
                awayTeam?.PrimaryColor ? `#${awayTeam.PrimaryColor}` : "black"
              }
            />
            <ScoreboardSquareBox text={game.AwayScoreQuarter1} />
            <ScoreboardSquareBox text={game.AwayScoreQuarter2} />
            <ScoreboardSquareBox text={game.AwayScoreQuarter3} />
            <ScoreboardSquareBox text={game.AwayScoreQuarter4} />
            <ScoreboardSquareBox text={game.AwayScore} />
          </div>
          <div className="flex">
            <ScoreboardSquareBox
              text={game.HomeTeam}
              color={
                homeTeam?.PrimaryColor ? `#${homeTeam.PrimaryColor}` : "black"
              }
            />
            <ScoreboardSquareBox text={game.HomeScoreQuarter1} />
            <ScoreboardSquareBox text={game.HomeScoreQuarter2} />
            <ScoreboardSquareBox text={game.HomeScoreQuarter3} />
            <ScoreboardSquareBox text={game.HomeScoreQuarter4} />
            <ScoreboardSquareBox text={game.HomeScore} />
          </div>
        </div>
        <div className="mt-3">
          <div className="font-bold text-3xl">{getCurrentQuater()}</div>
        </div>
      </div>
    </>
  );
}
