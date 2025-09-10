import { useState, useEffect } from "react";
import { getSportsPlayByPlay, testSportsData } from "./apiFunctions";
import Box from "./components/Box/Box";
import type { Game } from "./types";
import Scoreboard from "./components/Scoreboard/Scoreboard";
import LastUpdatedWidget from "./components/LastUpdatedWidget";
import TopMenuBar from "./components/TopMenuBar";
import Prizeboard from "./components/Prizeboard/Prizeboard";

function App() {
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [currentGameIndex, setCurrentGameIndex] = useState<number>(0);
  const [currentPlayNumber, setCurrentPlayNumber] = useState<number>(48);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const getData = async () => {
      // const data = await getSportsDataIOData();
      // const data = await getSportsPlayByPlay(currentPlayNumber);
      // console.log(data[0]);
      // setAllGames(data);
      const data = await testSportsData();
      console.log(data);
    };

    getData();
  }, [currentPlayNumber]);

  // useEffect(() => {
  //   if (!isPaused && currentPlayNumber < 200) {
  //     const timer = setTimeout(() => {
  //       setCurrentPlayNumber((prev) => prev + 1);
  //     }, 2000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [currentPlayNumber, isPaused]);

  // Add buttons to control pause/start
  // Place these in your JSX where appropriate
  // Example:
  // <button onClick={() => setIsPaused(true)}>Pause</button>
  // <button onClick={() => setIsPaused(false)}>Start</button>

  if (allGames.length == 0) {
    return <h1>No Game</h1>;
  }

  return (
    <>
      <TopMenuBar
        allGames={allGames}
        currentGameIndex={currentGameIndex}
        setCurrentGameIndex={setCurrentGameIndex}
        currentPlayNumber={currentPlayNumber}
        setCurrentPlayNumber={setCurrentPlayNumber}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />
      <div className="flex justify-center w-screen h-screen">
        <div className="flex flex-col w-[50%] p-2 border-r-4">
          <LastUpdatedWidget
            lastUpdated={allGames[currentGameIndex].LastUpdated}
          />
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
