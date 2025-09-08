import { useState, useEffect } from "react";
import "./App.css";
import Box from "./Box";
import {
  type Game,
  type Quarter,
  type References,
  type WinningScore,
} from "./types";
import Scoreboard from "./Scoreboard";
import LastUpdatedWidget from "./LastUpdatedWidget";
import TopMenuBar from "./TopMenuBar";

function App() {
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [references, setReferences] = useState<References | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [quarterScores, setQuarterScores] = useState<WinningScore[]>([]);
  const [allGames, setAllGames] = useState<Game[]>([]);

  useEffect(() => {
    const getData = async () => {
      const url = `${
        import.meta.env.VITE_API_URL
      }/v2.1/pull/nfl/current/date/20250907/games.json`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(import.meta.env.VITE_API_KEY),
        },
      });

      const data = await res.json();
      setLastUpdated(data["lastUpdatedOn"]);
      setReferences(data["references"]);
      setAllGames(data["games"]);
      const game: Game = data["games"][0];

      if (game.score.quarters.length > 0) {
        game.score.homeScoreTotal = game.score.quarters.reduce(
          (accumulator: number, currentValue: Quarter) =>
            accumulator + currentValue.homeScore,
          0
        );
        game.score.awayScoreTotal = game.score.quarters.reduce(
          (sum: number, quater: Quarter) => sum + quater.awayScore,
          0
        );
      }

      setCurrentGame(game);

      const newQuarterScores = [];
      for (let i = 0; i < game.score.quarters.length; i++) {
        const homeScore = game.score.quarters
          .slice(0, i + 1)
          .reduce((sum, quarter: Quarter) => sum + quarter.homeScore, 0);
        const awayScore = game.score.quarters
          .slice(0, i + 1)
          .reduce((sum, quarter: Quarter) => sum + quarter.awayScore, 0);

        newQuarterScores.push({ homeScore: homeScore, awayScore: awayScore });
      }
      setQuarterScores(newQuarterScores);
    };

    getData();
  }, []);

  if (!currentGame) {
    return <h1>No Game</h1>;
  }

  if (!references) {
    return <h1>References is Loading</h1>;
  }

  return (
    <>
      <TopMenuBar allGames={allGames} setCurrentGame={setCurrentGame} />
      <div className="main-grid">
        <div className="info-grid-container">
          <LastUpdatedWidget lastUpdated={lastUpdated} />
          <Scoreboard game={currentGame} references={references} />
        </div>
        <div className="box-grid-container">
          <Box
            game={currentGame}
            references={references}
            quarterScores={quarterScores}
          />
        </div>
      </div>
    </>
  );
}

export default App;
