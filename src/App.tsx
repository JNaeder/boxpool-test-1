import { useState, useEffect } from "react";
import { testSportsData } from "./apiFunctions";
import Box from "./components/Box/Box";
import type { Game } from "./types";
import Scoreboard from "./components/Scoreboard/Scoreboard";
import TopMenuBar from "./components/TopMenuBar";
import Prizeboard from "./components/Prizeboard/Prizeboard";

function App() {
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [currentGameIndex, setCurrentGameIndex] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      const data = await testSportsData();
      // console.log(data["events"][0]);
      setAllGames(data["events"]);
    };

    getData();
  }, []);

  if (allGames.length == 0) {
    return <h1>No Game</h1>;
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
          {/* <LastUpdatedWidget
            lastUpdated={allGames[currentGameIndex].LastUpdated}
          /> */}
          <Scoreboard game={allGames[currentGameIndex]} />
          <Prizeboard />
        </div>
        <div className="w-full p-2">
          <Box game={allGames[currentGameIndex]} />
        </div>
      </div>
    </>
  );
}

export default App;
