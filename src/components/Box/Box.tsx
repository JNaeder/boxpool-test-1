import { teamData } from "../../data";
import BoxSquare from "./BoxSquare";
import NumberSquare from "./NumberSquare";
import { namesMatrix } from "../../data";
import type { Game, Team, WinningScore } from "../../types";

const topRowNumbers = [9, 1, 2, 0, 7, 3, 4, 6, 5, 8];
const sideRowNumbers = [3, 5, 9, 0, 7, 1, 6, 2, 4, 8];

export default function Box({ game }: { game: Game }) {
  const homeTeam: Team | undefined = teamData.find(
    (team) => team.TeamID === game.HomeTeamID
  );

  const awayTeam: Team | undefined = teamData.find(
    (team) => team.TeamID === game.AwayTeamID
  );

  const quarterScores: WinningScore[] = [];
  for (let i = 0; i < 4; i++) {
    const homeScore = game[`HomeScoreQuarter${i + 1}` as keyof Game] as number;
    const awayScore = game[`AwayScoreQuarter${i + 1}` as keyof Game] as number;
    quarterScores.push({ homeScore, awayScore });
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col items-end">
          <div className="flex justify-center items-center 300 w-[calc(10*var(--spacing-box))]">
            <img
              src={homeTeam?.WikipediaLogoUrl ?? undefined}
              className="h-20"
            />
            <div className="font-bold text-4xl">{homeTeam?.FullName}</div>
          </div>
          <div className="flex items-end">
            <div className="flex justify-center items-center [writing-mode:sideways-lr] h-[calc(10*var(--spacing-box))]">
              <img
                src={awayTeam?.WikipediaLogoUrl ?? undefined}
                className="h-20"
              />
              <div className="font-bold text-4xl">{awayTeam?.FullName}</div>
            </div>
            <div>
              <div className="flex flex-col">
                <div
                  className="flex ml-number-box text-xl"
                  style={{
                    backgroundColor: homeTeam?.PrimaryColor
                      ? `#${homeTeam.PrimaryColor}`
                      : "black",
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
                      backgroundColor: awayTeam?.PrimaryColor
                        ? `#${awayTeam.PrimaryColor}`
                        : "black",
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
