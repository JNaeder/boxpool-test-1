import Scoreboard from "./Scoreboard/Scoreboard";
import Prizeboard from "./Prizeboard/Prizeboard";
import Box from "./Box/Box";
import type { Game } from "@/types";

export default function BoxPoolPage({
  allGames,
  currentGameIndex,
}: {
  allGames: Game[];
  currentGameIndex: number;
}) {
  return (
    <>
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
