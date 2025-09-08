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

function App() {
  const [game, setGame] = useState<Game | null>(null);
  const [references, setReferences] = useState<References | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [quarterScores, setQuarterScores] = useState<WinningScore[]>([]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const estString = date.toLocaleString("en-US", {
      timeZone: "America/New_York", // EST/EDT depending on daylight saving
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return estString;
  };

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

      setGame(game);

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

  if (!game) {
    return <h1>No Game</h1>;
  }

  if (!references) {
    return <h1>References is Loading</h1>;
  }

  return (
    <>
      <div className="top-bar">
        <h1>Boxpool</h1>
        <Scoreboard game={game} references={references} />
        <p>Last Updated: {formatDate(lastUpdated)}</p>
      </div>
      <Box game={game} references={references} quarterScores={quarterScores} />
    </>
  );
}

export default App;
