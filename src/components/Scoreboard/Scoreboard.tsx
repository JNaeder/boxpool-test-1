import type { Game, Competition, Competitor } from "../../types";
import CountdownTimer from "./CountdownTimer";
import ScoreboardTitleBox from "./ScoreboardTitleBox";
import ScoreboardSquareBox from "./ScoreboardSquareBox";

export default function Scoreboard({ game }: { game: Game }) {
  const competition: Competition = game.competitions[0];
  const competitors: Competitor[] = competition.competitors;

  const homeTeam: Competitor | undefined = competitors.find(
    (competitor) => competitor.homeAway === "home"
  );

  const awayTeam: Competitor | undefined = competitors.find(
    (competitor) => competitor.homeAway === "away"
  );

  const getCurrentQuater = (): React.ReactNode | string => {
    if (game.status.type.name === "STATUS_SCHEDULED") {
      return (
        <div className="flex flex-col justify-center items-center">
          <div className="text-xl">{game.competitions[0].date}</div>
          <div className="text-2xl font-bold">
            <CountdownTimer targetDate={game.competitions[0].date} />
          </div>
        </div>
      );
    } else {
      return game.status.type.detail;
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
              text={awayTeam ? awayTeam?.team.abbreviation : ""}
              color={`#${awayTeam?.team.color}`}
            />
            <ScoreboardSquareBox
              text={awayTeam?.linescores?.[0]?.value ?? null}
            />
            <ScoreboardSquareBox
              text={
                awayTeam?.linescores && awayTeam?.linescores?.length > 1
                  ? awayTeam?.linescores?.[1]?.value
                  : null
              }
            />
            <ScoreboardSquareBox
              text={
                awayTeam?.linescores && awayTeam?.linescores?.length > 2
                  ? awayTeam?.linescores?.[2]?.value
                  : null
              }
            />
            <ScoreboardSquareBox
              text={
                awayTeam?.linescores && awayTeam?.linescores?.length > 3
                  ? awayTeam?.linescores?.[3]?.value
                  : null
              }
            />
            <ScoreboardSquareBox text={awayTeam?.score ?? null} />
          </div>
          <div className="flex">
            <ScoreboardSquareBox
              text={homeTeam ? homeTeam?.team.abbreviation : ""}
              color={`#${homeTeam?.team.color}`}
            />
            <ScoreboardSquareBox
              text={homeTeam?.linescores?.[0].value ?? null}
            />
            <ScoreboardSquareBox
              text={
                homeTeam?.linescores && homeTeam?.linescores?.length > 1
                  ? homeTeam?.linescores?.[1]?.value
                  : null
              }
            />
            <ScoreboardSquareBox
              text={
                homeTeam?.linescores && homeTeam?.linescores?.length > 2
                  ? homeTeam?.linescores?.[2]?.value
                  : null
              }
            />
            <ScoreboardSquareBox
              text={
                homeTeam?.linescores && homeTeam?.linescores?.length > 3
                  ? homeTeam?.linescores?.[3]?.value
                  : null
              }
            />
            <ScoreboardSquareBox text={homeTeam?.score ?? null} />
          </div>
        </div>
        <div className="mt-3 flex flex-col justify-center items-center ">
          {getCurrentQuater()}
          {/* <div className="text-xl">{game.TimeRemaining}</div>
          <div className="w-3/4 text-center">{game.LastPlay}</div> */}
        </div>
      </div>
    </>
  );
}
