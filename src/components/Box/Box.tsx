import BoxSquare from "./BoxSquare";
import NumberSquare from "./NumberSquare";
import type {
  Game,
  WinningScore,
  Competition,
  Competitor,
  Boxpool,
} from "../../types";
import type { FirebaseStorage } from "firebase/storage";

export default function Box({
  storage,
  isEditing,
  game,
  boxpoolData,
  editBoxData,
}: {
  storage: FirebaseStorage;
  isEditing: boolean;
  game: Game;
  boxpoolData: Boxpool;
  editBoxData: Function;
}) {
  const competition: Competition = game.competitions[0];
  const competitors: Competitor[] = competition.competitors;
  const rowNumbers = {
    homeBoxNumbers: boxpoolData.boxNumbers.homeBoxNumbers,
    awayBoxNumbers: boxpoolData.boxNumbers.awayBoxNumbers,
  };
  const boxes = boxpoolData.boxes;

  const homeTeam: Competitor | undefined = competitors.find(
    (competitor) => competitor.homeAway === "home"
  );

  const awayTeam: Competitor | undefined = competitors.find(
    (competitor) => competitor.homeAway === "away"
  );

  const quarterScores: WinningScore[] = [];

  const periodLength: number = competition.status.period ?? 4;

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
              <img src={homeTeam?.team.logos[0].href} width={100} />
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
              <img src={awayTeam?.team.logos[0].href} width={100} />
              <div className="font-bold text-4xl">
                {awayTeam?.team.displayName}
              </div>
            </div>
          </div>
          {/* Home Team Numbers */}
          <div
            className="col-span-10 col-start-4 row-start-3 grid grid-cols-10 border-r-1"
            style={{
              backgroundColor: `#${homeTeam?.team.color}`,
              color: "white",
            }}
          >
            {rowNumbers.homeBoxNumbers.map((number, i) => (
              <NumberSquare key={i} option="top" number={number} />
            ))}
          </div>
          {/* Away Team Numbers */}
          <div
            className="col-span-1 row-span-10 row-start-4 col-start-3 grid grid-cols-1 border-b-1"
            style={{
              backgroundColor: `#${awayTeam?.team.color}`,
              color: "white",
            }}
          >
            {rowNumbers.awayBoxNumbers.map((number, i) => (
              <NumberSquare key={i} option="side" number={number} />
            ))}
          </div>
          {/* Box Numbers */}
          <div className="col-span-10 row-span-10 col-start-4 grid grid-cols-10 grid-rows-10 border-b-1 border-r-1">
            {[...Array(100)].map((_, j) => {
              return (
                <BoxSquare
                  storage={storage}
                  key={j}
                  box={boxes[j + 1] ?? ""}
                  boxNumber={j + 1}
                  winningNumbers={{
                    homeScore: rowNumbers.homeBoxNumbers[j % 10],
                    awayScore: rowNumbers.awayBoxNumbers[Math.floor(j / 10)],
                  }}
                  quarterScores={quarterScores}
                  period={competition.status.period}
                  completed={competition.status.type.completed}
                  isEditing={isEditing}
                  editBoxData={editBoxData}
                  userId={boxpoolData.userId}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
