import { teamData } from "../../data";
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

  // const getCurrentQuater = (): React.ReactNode | string => {
  //   if (game.Status === "Scheduled") {
  //     return <CountdownTimer targetDate={game.Date} />;
  //   } else {
  //     return `${game.QuarterDescription} Quarter`;
  //   }
  // };
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
            <ScoreboardSquareBox text={awayTeam?.linescores?.[0]?.value ?? 0} />
            <ScoreboardSquareBox text={awayTeam?.linescores?.[1]?.value ?? 0} />
            <ScoreboardSquareBox text={awayTeam?.linescores?.[2]?.value ?? 0} />
            <ScoreboardSquareBox text={awayTeam?.linescores?.[3]?.value ?? 0} />
            <ScoreboardSquareBox text={awayTeam?.score ?? 0} />
          </div>
          <div className="flex">
            <ScoreboardSquareBox
              text={homeTeam ? homeTeam?.team.abbreviation : ""}
              color={`#${homeTeam?.team.color}`}
            />
            <ScoreboardSquareBox text={homeTeam?.linescores?.[0].value ?? 0} />
            <ScoreboardSquareBox text={homeTeam?.linescores?.[1].value ?? 0} />
            <ScoreboardSquareBox text={homeTeam?.linescores?.[2].value ?? 0} />
            <ScoreboardSquareBox text={homeTeam?.linescores?.[3].value ?? 0} />
            <ScoreboardSquareBox text={homeTeam?.score ?? 0} />
          </div>
        </div>
        <div className="mt-3 flex flex-col justify-center items-center ">
          <div className="font-bold text-3xl">
            {game.status.type.description}
          </div>
          {/* <div className="text-xl">{game.TimeRemaining}</div>
          <div className="w-3/4 text-center">{game.LastPlay}</div> */}
        </div>
      </div>
    </>
  );
}
