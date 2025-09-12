// import { useState } from "react";
// import { getWeekScoreboard, getGameSummary } from "./apiFunctions";
import { boxpoolData } from "./fakeDB";
// import type { Game } from "./types";
import TopMenuBar from "./components/TopMenuBar";
import BoxPoolPage from "./components/BoxPoolPage";

function App() {
  // const [allGames, setAllGames] = useState<Game[]>([]);
  // const [currentGameIndex, setCurrentGameIndex] = useState<number>(0);
  // const [currentGameSummary, setCurrentGameSummary] =
  //   useState<GameSummary | null>(null);

  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await getWeekScoreboard(2);
  //     const allGames = data["events"];
  //     setAllGames(allGames);
  //     const currentGame: Game = allGames[0];

  //     const gameSummary = await getGameSummary(currentGame.id);
  //     console.log(gameSummary);
  //     setCurrentGameSummary(gameSummary);
  //   };

  //   getData();
  // }, []);

  // if (allGames.length == 0) {
  //   return <h1>No Game</h1>;
  // }

  return (
    <>
      <TopMenuBar />
      <BoxPoolPage boxpoolData={boxpoolData} />
    </>
  );
}

export default App;
