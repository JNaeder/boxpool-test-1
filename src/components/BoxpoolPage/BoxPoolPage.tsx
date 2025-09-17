import { useState, useEffect } from "react";
import { getGameSummary } from "../../apiFunctions";
import { formatDate } from "@/helperFunctions";
import Scoreboard from "../Scoreboard/Scoreboard";
import Prizeboard from "../Prizeboard/Prizeboard";
import ScoringPlays from "../ScoringPlays/ScoringPlays";
import { Spinner } from "../ui/shadcn-io/spinner";
import type { GameSummary } from "../../types/gameTypes";
import type { Boxpool } from "@/types/boxpoolTypes";
import { useParams } from "react-router";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import BoxEditMenu from "./BoxEditMenu";
import Box from "../Box/Box";
import { db, storage } from "@/lib/firebase";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  setCurrentEventId,
  setCurrentGameSummary,
  setCurrentBoxpoolData,
} from "../../slices/gameSlice";

type BoxPoolParams = { boxId: string };

export default function BoxPoolPage() {
  const paramsData = useParams() as BoxPoolParams;
  const dispatch = useAppDispatch();

  const { currentEventId, currentGameSummary, currentBoxpoolData } =
    useAppSelector((store) => store.game);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const updateGameSummaryData = async (eventId: string) => {
    const gameSummary: GameSummary = await getGameSummary(eventId);
    dispatch(setCurrentGameSummary(gameSummary));
    // If You need to import fake data
    // VVVVVVVVVV
    // setCurrentGameSummary(structuredClone(testData) as unknown as GameSummary);
  };

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "boxpools", paramsData.boxId);
      const docData = await getDoc(docRef);
      if (docData.exists()) {
        const data = docData.data() as Boxpool;
        dispatch(setCurrentBoxpoolData(data));
        dispatch(setCurrentEventId(data.eventId));
        updateGameSummaryData(data.eventId);
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

  const editBoxData = (boxNumber: number, newData: Object) => {
    const boxData = { ...currentBoxpoolData };
    boxData.boxes[boxNumber] = {
      ...boxData.boxes[boxNumber],
      ...newData,
    };
    setCurrentBoxpoolData(boxData);
  };

  const updateEventId = async () => {
    const docRef = doc(db, "boxpools", paramsData.boxId);
    await updateDoc(docRef, { eventId: currentEventId });
    if (currentEventId) {
      updateGameSummaryData(currentEventId);
    }
  };

  const writeBoxDataToDB = async () => {
    const docRef = doc(db, "boxpools", paramsData.boxId);
    await setDoc(docRef, currentBoxpoolData);
  };

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
          <Box
            storage={storage}
            isEditing={isEditing}
            game={currentGameSummary.header}
            boxpoolData={currentBoxpoolData}
            editBoxData={editBoxData}
          />
        </div>
        <div className="flex flex-col w-1/4 ">
          <BoxEditMenu
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            writeBoxDataToDB={writeBoxDataToDB}
            updateEventId={updateEventId}
          />
          <Prizeboard boxpoolData={currentBoxpoolData} />
        </div>
      </div>
    </>
  );
}
