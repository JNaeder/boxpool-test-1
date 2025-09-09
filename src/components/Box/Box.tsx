import BoxSquare from "./BoxSquare";
import NumberSquare from "./NumberSquare";
import { namesMatrix } from "../../data";
import type { Game, References, Team, WinningScore } from "../../types";

const topRowNumbers = [9, 1, 2, 0, 7, 3, 4, 6, 5, 8];
const sideRowNumbers = [3, 5, 9, 0, 7, 1, 6, 2, 4, 8];

export default function Box({
  game,
  references,
  quarterScores,
}: {
  game: Game;
  references: References;
  quarterScores: WinningScore[];
}) {
  const homeTeam: Team | undefined = references.teamReferences.find(
    (team) => team.id == game.schedule.homeTeam.id
  );

  const awayTeam: Team | undefined = references.teamReferences.find(
    (team) => team.id == game.schedule.awayTeam.id
  );

  return (
    <>
      <div className="flex">
        <div className="flex flex-col items-end">
          <div className="flex justify-center items-center 300 w-[calc(10*var(--spacing-box))]">
            <img src={homeTeam?.officialLogoImageSrc} width="80px" />
            <div className="font-bold text-4xl">
              {homeTeam?.city} {homeTeam?.name}
            </div>
          </div>
          <div className="flex items-end">
            <div className="flex justify-center items-center [writing-mode:sideways-lr] h-[calc(10*var(--spacing-box))]">
              <img src={awayTeam?.officialLogoImageSrc} width="80px" />
              <div className="font-bold text-4xl">
                {awayTeam?.city} {awayTeam?.name}
              </div>
            </div>
            <div>
              <div className="flex flex-col">
                <div
                  className="flex ml-number-box text-xl"
                  style={{
                    backgroundColor: homeTeam?.teamColoursHex[0],
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
                      backgroundColor: awayTeam?.teamColoursHex[0],
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
