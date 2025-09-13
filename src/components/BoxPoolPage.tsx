import { useState, useEffect } from "react";
import { getGameSummary } from "../apiFunctions";
import Scoreboard from "./Scoreboard/Scoreboard";
import Prizeboard from "./Prizeboard/Prizeboard";
import ScoringPlays from "./ScoringPlays/ScoringPlays";
import Box from "./Box/Box";
import { Spinner } from "./ui/shadcn-io/spinner";
import type { Boxpool, GameSummary } from "@/types";
import { useParams } from "react-router";
import { type Firestore, doc, getDoc } from "firebase/firestore";

type BoxPoolParams = { boxId: string };

export default function BoxPoolPage({ db }: { db: Firestore }) {
  const data = useParams() as BoxPoolParams;

  const [currentGameSummary, setCurrentGameSummary] =
    useState<GameSummary | null>(null);
  const [currentBoxpoolData, setCurrentBoxpoolData] = useState<Boxpool | null>(
    null
  );

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "boxpools", data.boxId);
      const docData = await getDoc(docRef);
      if (docData.exists()) {
        const data = docData.data() as Boxpool;
        setCurrentBoxpoolData(data);
        const gameSummary = await getGameSummary(data.eventId);
        setCurrentGameSummary(gameSummary);
      }
    };
    getData();
  }, []);

  if (!currentGameSummary || !currentBoxpoolData)
    return (
      <>
        <div className="b h-[calc(100vh-50px)] flex flex-col justify-center items-center">
          <Spinner size={100} variant="bars" />
        </div>
      </>
    );

  return (
    <>
      <div className="flex justify-center w-screen h-screen">
        <div className="flex flex-col w-[50%] p-2 border-r-4">
          <Prizeboard boxpoolData={currentBoxpoolData} />
          <Scoreboard game={currentGameSummary.header} />
          <ScoringPlays gameSummary={currentGameSummary} />
        </div>
        <div className="w-full p-2">
          <Box
            game={currentGameSummary.header}
            boxpoolData={currentBoxpoolData}
          />
        </div>
      </div>
    </>
  );
}
