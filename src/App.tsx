import { useState, useEffect } from "react";
import "./App.css";
import Box from "./Box";
import type { Game, References } from "./types";
import Scoreboard from "./Scoreboard";

function App() {
  const [game, setGame] = useState<Game | null>(null);
  const [references, setReferences] = useState<References | null>(null);

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
      setReferences(data["references"]);
      setGame(data["games"][4]);
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
        <h1>NFL Boxpool</h1>
        <Scoreboard game={game} references={references} />
      </div>
      <Box game={game} references={references} />
    </>
  );
}

export default App;
