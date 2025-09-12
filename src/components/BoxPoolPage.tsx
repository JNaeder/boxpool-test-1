import { useState, useEffect } from "react";
import { getGameSummary } from "../apiFunctions";
import Scoreboard from "./Scoreboard/Scoreboard";
import Prizeboard from "./Prizeboard/Prizeboard";
import Box from "./Box/Box";
import type { Boxpool, GameSummary } from "@/types";

export default function BoxPoolPage({ boxpoolData }: { boxpoolData: Boxpool }) {
  const [currentGameSummary, setCurrentGameSummary] =
    useState<GameSummary | null>(null);

  useEffect(() => {
    const getData = async () => {
      const gameSummary = await getGameSummary(boxpoolData.eventId);
      // console.log(gameSummary);
      setCurrentGameSummary(gameSummary);
    };

    getData();
  }, []);

  if (!currentGameSummary) return <></>;

  return (
    <>
      <div className="flex justify-center w-screen h-screen">
        <div className="flex flex-col w-[50%] p-2 border-r-4">
          {/* <LastUpdatedWidget
              lastUpdated={allGames[currentGameIndex].LastUpdated}
            /> */}
          <Scoreboard game={currentGameSummary.header} />
          <Prizeboard />
        </div>
        <div className="w-full p-2">
          <Box game={currentGameSummary.header} />
        </div>
      </div>
    </>
  );
}
