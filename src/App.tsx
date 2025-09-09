import { useState, useEffect } from "react";
import Box from "./components/Box/Box";
import type { Game, References } from "./types";
import Scoreboard from "./components/Scoreboard/Scoreboard";
import LastUpdatedWidget from "./components/LastUpdatedWidget";
import TopMenuBar from "./components/TopMenuBar";
import Prizeboard from "./components/Prizeboard/Prizeboard";

function App() {
  const [references, setReferences] = useState<References | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [currentGameIndex, setCurrentGameIndex] = useState<number>(0);

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
      console.log(data);
      setLastUpdated(data["lastUpdatedOn"]);
      setReferences(data["references"]);
      setAllGames(data["games"]);
    };

    getData();
  }, []);

  if (allGames.length == 0) {
    return <h1>No Game</h1>;
  }

  if (!references) {
    return <h1>References is Loading</h1>;
  }

  return (
    <>
      <TopMenuBar
        allGames={allGames}
        currentGameIndex={currentGameIndex}
        setCurrentGameIndex={setCurrentGameIndex}
      />
      <div className="flex justify-center w-screen h-screen">
        <div className="flex flex-col w-[50%] p-2 border-r-4">
          <LastUpdatedWidget lastUpdated={lastUpdated} />
          <Scoreboard
            game={allGames[currentGameIndex]}
            references={references}
          />
          <Prizeboard />
        </div>
        <div className="w-full p-2">
          <Box game={allGames[currentGameIndex]} references={references} />
        </div>
      </div>
    </>
  );
}

export default App;
