// React and external libraries
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";

// Redux hooks
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  setCurrentGameSummary,
  setCurrentBoxpoolData,
} from "../../slices/gameSlice";

// Components
import Scoreboard from "../Scoreboard/Scoreboard";
import Prizeboard from "../Prizeboard/Prizeboard";
import ScoringPlays from "../ScoringPlays/ScoringPlays";
import BoxEditMenu from "./BoxEditMenu";
import Box from "../Box/Box";
import { Spinner } from "../ui/shadcn-io/spinner";

// Types
import type { Boxpool } from "@/types/boxpoolTypes";
import type { GameSummary } from "@/types/gameTypes";

// Utils and services
import { formatDate } from "@/helperFunctions";
import { db } from "@/lib/firebase";
import { getGameSummary } from "@/apiFunctions";

type BoxPoolParams = { boxId: string };

export default function BoxPoolPage() {
  const paramsData = useParams() as BoxPoolParams;
  const dispatch = useAppDispatch();

  const { currentGameSummary, currentBoxpoolData } = useAppSelector(
    (store) => store.game
  );

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const getGameData = async () => {
    if (currentBoxpoolData) {
      const gameSummary: GameSummary = await getGameSummary(
        currentBoxpoolData.eventId
      );
      dispatch(setCurrentGameSummary(gameSummary));
    }
  };

  // Updates Once on page load
  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "boxpools", paramsData.boxId);
      const docData = await getDoc(docRef);
      if (docData.exists()) {
        const data = docData.data() as Boxpool;
        data.id = paramsData.boxId;
        dispatch(setCurrentBoxpoolData(data));
      }
    };
    getData();
  }, []);

  // Updates Game Summary when Boxpoo data changes
  useEffect(() => {
    getGameData();
  }, [currentBoxpoolData?.eventId]);

  // Checking - Load if doesn't exist
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
      <div className="bg-neutral-200 flex justify-start  w-screen h-[calc(100vh-50px)]">
        <div className="flex flex-col w-1/4 p-2 ">
          <div className="bg-black text-white text-center mb-3 w-fit mx-auto py-1 px-5 rounded-lg">
            {formatDate(currentGameSummary.header.competitions[0].date)}
          </div>
          <Scoreboard />
          <ScoringPlays gameSummary={currentGameSummary} />
        </div>
        <div className="flex w-1/2">
          <Box isEditing={isEditing} />
        </div>
        <div className="flex flex-col w-1/4 ">
          <BoxEditMenu
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            boxId={paramsData.boxId}
          />
          <Prizeboard boxpoolData={currentBoxpoolData} isEditing={isEditing} />
        </div>
      </div>
    </>
  );
}
