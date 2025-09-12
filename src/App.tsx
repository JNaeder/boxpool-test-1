import { useState, useEffect } from "react";
import { testSportsData } from "./apiFunctions";
import type { Game } from "./types";
import TopMenuBar from "./components/TopMenuBar";
import BoxPoolPage from "./components/BoxPoolPage";

function App() {
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [currentGameIndex, setCurrentGameIndex] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      const data = await testSportsData();
      // const data = savedTestData();
      console.log(data["events"][0]);
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
      <BoxPoolPage allGames={allGames} currentGameIndex={currentGameIndex} />
    </>
  );
}

export default App;
