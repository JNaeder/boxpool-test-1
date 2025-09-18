import type { Competition, Competitor } from "../../types/gameTypes";
import CountdownTimer from "./CountdownTimer";
import ScoreboardTitleBox from "./ScoreboardTitleBox";
import ScoreboardSquareBox from "./ScoreboardSquareBox";
import footballSVG from "../../assets/football-1b.svg";
import { useAppSelector } from "@/hooks";

export default function Scoreboard() {
  const { currentGameSummary } = useAppSelector((store) => store.game);
  if (!currentGameSummary) return <></>;

  const competition: Competition = currentGameSummary.header.competitions[0];
  const competitors: Competitor[] = competition.competitors;

  const homeTeam: Competitor | undefined = competitors.find(
    (competitor) => competitor.homeAway === "home"
  );

  const awayTeam: Competitor | undefined = competitors.find(
    (competitor) => competitor.homeAway === "away"
  );

  const getCurrentQuater = (): React.ReactNode | string => {
    if (competition.status.type.name === "STATUS_SCHEDULED") {
      return (
        <div className="flex flex-col justify-center items-center">
          <div className="text-xl">{competition.status.type.detail}</div>
          <div className="text-2xl font-bold">
            <CountdownTimer targetDate={competition.date} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col justify-center items-center">
          <div className="text-2xl">{competition.status.type.detail}</div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mb-4">
        <div className="flex flex-col">
          <div className="flex">
            <ScoreboardTitleBox text="" />
            <ScoreboardTitleBox text="" />
            <ScoreboardTitleBox text="Q1" />
            <ScoreboardTitleBox text="Q2" />
            <ScoreboardTitleBox text="Q3" />
            <ScoreboardTitleBox text="Q4" />
            <ScoreboardTitleBox text="Total" />
          </div>
          <div className="flex">
            {awayTeam?.possession ? (
              <>
                <ScoreboardSquareBox image={footballSVG} />
              </>
            ) : (
              <>
                <ScoreboardTitleBox text="" />
              </>
            )}
            <ScoreboardSquareBox
              text={awayTeam ? awayTeam?.team.abbreviation : ""}
              color={`#${awayTeam?.team.color}`}
            />
            <ScoreboardSquareBox
              text={awayTeam?.linescores?.[0]?.displayValue ?? null}
            />
            <ScoreboardSquareBox
              text={
                awayTeam?.linescores && awayTeam?.linescores?.length > 1
                  ? awayTeam?.linescores?.[1]?.displayValue
                  : null
              }
            />
            <ScoreboardSquareBox
              text={
                awayTeam?.linescores && awayTeam?.linescores?.length > 2
                  ? awayTeam?.linescores?.[2]?.displayValue
                  : null
              }
            />
            <ScoreboardSquareBox
              text={
                awayTeam?.linescores && awayTeam?.linescores?.length > 3
                  ? awayTeam?.linescores?.[3]?.displayValue
                  : null
              }
            />
            <ScoreboardSquareBox text={awayTeam?.score ?? null} />
            <ScoreboardTitleBox text="" />
          </div>
          <div className="flex">
            {homeTeam?.possession ? (
              <>
                <ScoreboardSquareBox image={footballSVG} />
              </>
            ) : (
              <>
                <ScoreboardTitleBox text="" />
              </>
            )}
            <ScoreboardSquareBox
              text={homeTeam ? homeTeam?.team.abbreviation : ""}
              color={`#${homeTeam?.team.color}`}
            />
            <ScoreboardSquareBox
              text={homeTeam?.linescores?.[0].displayValue ?? null}
            />
            <ScoreboardSquareBox
              text={
                homeTeam?.linescores && homeTeam?.linescores?.length > 1
                  ? homeTeam?.linescores?.[1]?.displayValue
                  : null
              }
            />
            <ScoreboardSquareBox
              text={
                homeTeam?.linescores && homeTeam?.linescores?.length > 2
                  ? homeTeam?.linescores?.[2]?.displayValue
                  : null
              }
            />
            <ScoreboardSquareBox
              text={
                homeTeam?.linescores && homeTeam?.linescores?.length > 3
                  ? homeTeam?.linescores?.[3]?.displayValue
                  : null
              }
            />
            <ScoreboardSquareBox text={homeTeam?.score ?? null} />
            <ScoreboardTitleBox text="" />
          </div>
        </div>
        <div className="mt-3 flex flex-col justify-center items-center ">
          {getCurrentQuater()}
        </div>
      </div>
    </>
  );
}
