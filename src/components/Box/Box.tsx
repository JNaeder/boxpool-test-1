import BoxSquare from "./BoxSquare";
import NumberSquare from "./NumberSquare";
import type { Competition, Competitor } from "../../types/gameTypes";
import type { WinningScore } from "../../types/boxpoolTypes";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { Shuffle } from "lucide-react";
import { Button } from "../ui/button";
import { generateRandomNumberBoxes } from "@/slices/gameSlice";

export default function Box({ isEditing }: { isEditing: boolean }) {
  const dispatch = useAppDispatch();
  const { currentBoxpoolData, currentGameSummary } = useAppSelector(
    (store) => store.game
  );
  // if (!currentGameSummary) return <>No Game Summary</>;
  if (!currentBoxpoolData) return <>No Box Pool Data</>;

  const game = currentGameSummary?.header;
  const competition: Competition | undefined = game?.competitions[0];
  const competitors: Competitor[] = competition?.competitors ?? [];
  const { boxes, boxNumbers, userId } = currentBoxpoolData;

  const homeTeam: Competitor | undefined = competitors.find(
    (competitor) => competitor.homeAway === "home"
  );

  const awayTeam: Competitor | undefined = competitors.find(
    (competitor) => competitor.homeAway === "away"
  );

  const quarterScores: WinningScore[] = [];

  const periodLength: number = competition?.status.period ?? 4;

  for (let i = 0; i < periodLength; i++) {
    const homeScore = homeTeam?.linescores
      ?.slice(0, i + 1)
      .reduce((acc, score) => acc + Number(score.displayValue), 0);
    const awayScore = awayTeam?.linescores
      ?.slice(0, i + 1)
      .reduce((acc, score) => acc + Number(score.displayValue), 0);
    quarterScores.push({
      homeScore: homeScore ?? 0,
      awayScore: awayScore ?? 0,
    });
  }

  return (
    <>
      <div className="mx-auto">
        <div className="grid grid-cols-13 grid-rows-13">
          {/* Home Team Sign */}
          <div className="col-span-10 row-span-2 col-start-4 row-start-1">
            <div className="flex items-center justify-center h-full">
              <img src={homeTeam?.team.logos?.[0].href ?? ""} width={100} />
              <div className="font-bold text-4xl">
                {homeTeam?.team.displayName}
              </div>
            </div>
          </div>
          {/* Away Team Sign */}
          <div className="row-span-10 row-start-4 col-span-2 grid grid-cols-1">
            <div
              style={{ writingMode: "sideways-lr" }}
              className="flex items-center justify-center w-full"
            >
              <img src={awayTeam?.team.logos?.[0]?.href ?? ""} width={100} />
              <div className="font-bold text-4xl">
                {awayTeam?.team.displayName}
              </div>
            </div>
          </div>
          {/* Random Number Box Button */}
          {isEditing && (
            <div className="col-start-3 row-start-3 m-auto">
              <Button
                className="bg-blue-500 border-2 border-white"
                onClick={() => dispatch(generateRandomNumberBoxes())}
              >
                <Shuffle />
              </Button>
            </div>
          )}
          {/* Home Team Numbers */}
          <div
            className="col-span-10 col-start-4 row-start-3 grid grid-cols-10 border-r-1"
            style={{
              backgroundColor: `#${homeTeam?.team.color ?? "777777"}`,
              color: "white",
            }}
          >
            {[...Array(10)].map((_, i) => {
              const squareNumber =
                boxNumbers.homeBoxNumbers[i] !== undefined
                  ? boxNumbers.homeBoxNumbers[i]
                  : "";
              return (
                <NumberSquare
                  key={i}
                  boxNumber={i}
                  number={String(squareNumber)}
                  isEditing={isEditing}
                  homeAway="home"
                />
              );
            })}
          </div>
          {/* Away Team Numbers */}
          <div
            className="col-span-1 row-span-10 row-start-4 col-start-3 grid grid-cols-1 border-b-1"
            style={{
              backgroundColor: `#${awayTeam?.team.color ?? "777777"}`,
              color: "white",
            }}
          >
            {[...Array(10)].map((_, i) => {
              const squareNumber =
                boxNumbers.awayBoxNumbers[i] !== undefined
                  ? boxNumbers.awayBoxNumbers[i]
                  : "";
              return (
                <NumberSquare
                  key={i}
                  boxNumber={i}
                  number={String(squareNumber)}
                  isEditing={isEditing}
                  homeAway="away"
                />
              );
            })}
          </div>
          {/* Box Numbers */}
          <div className="col-span-10 row-span-10 col-start-4 grid grid-cols-10 grid-rows-10 border-b-1 border-r-1">
            {[...Array(100)].map((_, j) => {
              return (
                <BoxSquare
                  key={j}
                  box={boxes[j + 1] ?? ""}
                  boxNumber={j + 1}
                  winningNumbers={{
                    homeScore: boxNumbers.homeBoxNumbers[j % 10],
                    awayScore: boxNumbers.awayBoxNumbers[Math.floor(j / 10)],
                  }}
                  quarterScores={quarterScores}
                  period={competition?.status.period}
                  completed={competition?.status.type.completed ?? false}
                  isEditing={isEditing}
                  userId={userId}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
