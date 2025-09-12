import BoxSquare from "./BoxSquare";
import NumberSquare from "./NumberSquare";
import { namesMatrix } from "../../data";
import type { Game, WinningScore, Competition, Competitor } from "../../types";

const topRowNumbers = [9, 1, 2, 7, 0, 3, 4, 6, 5, 8];
const sideRowNumbers = [3, 5, 9, 0, 7, 1, 6, 2, 4, 8];

export default function Box({ game }: { game: Game }) {
  const competition: Competition = game.competitions[0];
  const competitors: Competitor[] = competition.competitors;

  // console.log(game);

  const homeTeam: Competitor | undefined = competitors.find(
    (competitor) => competitor.homeAway === "home"
  );

  const awayTeam: Competitor | undefined = competitors.find(
    (competitor) => competitor.homeAway === "away"
  );

  const quarterScores: WinningScore[] = [];
  for (let i = 0; i < 4; i++) {
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
                  {topRowNumbers.map((number, i) => (
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
                    {sideRowNumbers.map((number, i) => (
                      <NumberSquare key={i} option="side" number={number} />
                    ))}
                  </div>

                  <div className="flex flex-col">
                    {namesMatrix.map((_, i) => (
                      <div className="flex" key={i}>
                        {namesMatrix[i].map((name, j) => (
                          <BoxSquare
                            key={i + j}
                            name={name}
                            boxNumber={10 * i + j + 1}
                            winningNumbers={{
                              homeScore: topRowNumbers[j],
                              awayScore: sideRowNumbers[i],
                            }}
                            quarterScores={quarterScores}
                            period={game.status?.period}
                            completed={competition.status.type.completed}
                          />
                        ))}
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
