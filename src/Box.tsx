import BoxSquare from "./BoxSquare";
import NumberSquare from "./NumberSquare";
import { namesMatrix } from "./data";
import type { Game, References, Team, WinningScore } from "./types";
import "./Box.css";

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
  // const homeTeamScore: string = String(game.score.homeScoreTotal);
  // const awayTeamScore: string = String(game.score.awayScoreTotal);

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
          <div className="home-team-logo">
            <img src={homeTeam?.officialLogoImageSrc} width="80px" />
            <h2>
              {homeTeam?.city} {homeTeam?.name}
            </h2>
          </div>
          <div className="flex items-end">
            <div className="away-team-logo">
              <img src={awayTeam?.officialLogoImageSrc} width="80px" />
              <h2>
                {awayTeam?.city} {awayTeam?.name}
              </h2>
            </div>
            <div>
              <div className="flex flex-col">
                <div
                  className="number-square-top-row"
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
                    className="number-square-side-column"
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
