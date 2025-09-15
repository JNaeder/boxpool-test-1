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
      <div className="flex ml-10">
        <div className="flex flex-col items-end">
          <div className="flex justify-center items-center 300 w-[calc(10*var(--spacing-box))]">
            <img src={homeTeam?.team.logos[0].href} className="h-20" />
            <div className="font-bold text-4xl">
              {homeTeam?.team.displayName}
            </div>
          </div>
          <div className="flex items-end">
            <div className="flex justify-center items-center [writing-mode:sideways-lr] h-[calc(10*var(--spacing-box))]">
              <img src={awayTeam?.team.logos[0].href} className="h-20" />
              <div className="font-bold text-4xl">
                {awayTeam?.team.displayName}
              </div>
            </div>
            <div>
              <div className="flex flex-col">
                <div
                  className="flex ml-number-box text-xl"
                  style={{
                    backgroundColor: `#${homeTeam?.team.color}`,
                    color: "white",
                  }}
                >
                  {rowNumbers.homeBoxNumbers.map((number, i) => (
                    <NumberSquare key={i} option="top" number={number} />
                  ))}
                </div>
                <div className="flex">
                  <div
                    className="flex flex-col text-xl"
                    style={{
                      backgroundColor: `#${awayTeam?.team.color}`,
                      color: "white",
                    }}
                  >
                    {rowNumbers.awayBoxNumbers.map((number, i) => (
                      <NumberSquare key={i} option="side" number={number} />
                    ))}
                  </div>
                  <div className="flex flex-col">
                    {[...Array(10)].map((_, i) => (
                      <div className="flex" key={i}>
                        {[...Array(10)].map((_, j) => {
                          const boxNumber = 10 * i + j + 1;
                          return (
                            <BoxSquare
                              storage={storage}
                              key={boxNumber}
                              box={boxes[boxNumber] ?? ""}
                              boxNumber={boxNumber}
                              winningNumbers={{
                                homeScore: rowNumbers.homeBoxNumbers[j],
                                awayScore: rowNumbers.awayBoxNumbers[i],
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
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
