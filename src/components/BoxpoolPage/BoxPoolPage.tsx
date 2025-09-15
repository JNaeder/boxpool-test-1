import { useState, useEffect } from "react";
import { getGameSummary } from "../../apiFunctions";
import { formatDate } from "@/helperFunctions";
import Scoreboard from "../Scoreboard/Scoreboard";
import Prizeboard from "../Prizeboard/Prizeboard";
import ScoringPlays from "../ScoringPlays/ScoringPlays";
import Box from "../Box/Box";
import { Spinner } from "../ui/shadcn-io/spinner";
import type { Boxpool, GameSummary } from "@/types";
import { useParams } from "react-router";
import {
  type Firestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { type FirebaseStorage } from "firebase/storage";
import BoxEditMenu from "./BoxEditMenu";

type BoxPoolParams = { boxId: string };

export default function BoxPoolPage({
  db,
  storage,
}: {
  db: Firestore;
  storage: FirebaseStorage;
}) {
  const paramsData = useParams() as BoxPoolParams;

  const [currentEventId, setCurrentEventId] = useState<string | undefined>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentGameSummary, setCurrentGameSummary] =
    useState<GameSummary | null>(null);
  const [currentBoxpoolData, setCurrentBoxpoolData] = useState<Boxpool | null>(
    null
  );

  const updateGameSummaryData = async (eventId: string) => {
    const gameSummary: GameSummary = await getGameSummary(eventId);
    setCurrentGameSummary(gameSummary);
  };

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "boxpools", paramsData.boxId);
      const docData = await getDoc(docRef);
      if (docData.exists()) {
        const data = docData.data() as Boxpool;
        setCurrentBoxpoolData(data);
        setCurrentEventId(data.eventId);
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
    // console.log(boxData);
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
    // console.log("Wrote data to", paramsData.boxId);
  };

  return (
    <>
      <div className="flex justify-center bg-neutral-100 w-screen h-[calc(100vh-50px)]">
        <div className="flex flex-col w-[50%] p-2 border-r-4">
          <div className="bg-black text-white text-center mb-3 w-fit mx-auto py-1 px-5 rounded-lg">
            {formatDate(currentGameSummary.header.competitions[0].date)}
          </div>
          <Prizeboard boxpoolData={currentBoxpoolData} />
          <Scoreboard game={currentGameSummary.header} />
          <ScoringPlays gameSummary={currentGameSummary} />
        </div>
        <div className="w-full flex flex-col  items-center">
          <BoxEditMenu
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            writeBoxDataToDB={writeBoxDataToDB}
            updateEventId={updateEventId}
            setCurrentEventId={setCurrentEventId}
          />
          <Box
            storage={storage}
            isEditing={isEditing}
            game={currentGameSummary.header}
            boxpoolData={currentBoxpoolData}
            editBoxData={editBoxData}
          />
        </div>
      </div>
    </>
  );
}
