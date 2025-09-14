import { useState } from "react";
import type { WinningScore, Box } from "../../types";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import BoxEditPopUp from "./BoxEditPopUp";
import {
  type FirebaseStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default function BoxSquare({
  storage,
  box,
  boxNumber,
  winningNumbers,
  quarterScores,
  period,
  completed,
  isEditing,
  editBoxData,
  userId,
}: {
  storage: FirebaseStorage;
  box: Box;
  boxNumber: number;
  winningNumbers: WinningScore;
  quarterScores: WinningScore[];
  period: number | undefined;
  completed: boolean;
  isEditing: boolean;
  editBoxData: Function;
  userId: string;
}) {
  const [boxName, setBoxName] = useState<string>(box.name ?? "");
  const [boxFont, setBoxFont] = useState<string>(box.font ?? "normal");
  const [boxFontSize, setBoxFontSize] = useState<number>(box.fontSize ?? 14);
  const [boxImage, setBoxImage] = useState<File | undefined>();
  const [boxImageURL, setBoxImageURL] = useState<string>("");
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  type ColorState = {
    color: string;
    state: boolean;
  };
  const winColorStates: ColorState[] = [
    {
      color: "blue-400",
      state:
        (period ?? 0) >= 1 || completed
          ? quarterScores[0].homeScore % 10 === winningNumbers.homeScore &&
            quarterScores[0].awayScore % 10 === winningNumbers.awayScore
          : false,
    },
    {
      color: "green-400",
      state:
        (period ?? 0) >= 2 || completed
          ? quarterScores[1].homeScore % 10 === winningNumbers.homeScore &&
            quarterScores[1].awayScore % 10 === winningNumbers.awayScore
          : false,
    },
    {
      color: "yellow-400",
      state:
        (period ?? 0) >= 3 || completed
          ? quarterScores[2].homeScore % 10 === winningNumbers.homeScore &&
            quarterScores[2].awayScore % 10 === winningNumbers.awayScore
          : false,
    },
    {
      color: "red-400",
      state:
        (period ?? 0) >= 4 || completed
          ? quarterScores[3].homeScore % 10 === winningNumbers.homeScore &&
            quarterScores[3].awayScore % 10 === winningNumbers.awayScore
          : false,
    },
  ];

  const winners = winColorStates.filter((state) => state.state);

  const getColorString = (): string => {
    if (winners.length == 1) {
      return `!bg-${winners[0].color} font-bold`;
    } else if (winners.length == 2) {
      return `bg-linear-to-br from-${winners[0].color} from-50% to-${winners[1].color} to-50% font-bold`;
    } else {
      return "";
    }
  };

  const uploadImage = async () => {
    if (!boxImage) return;
    try {
      const imageRef = ref(storage, `boxesImages/${userId}/${boxImage.name}`);
      const snapshot = await uploadBytes(imageRef, boxImage);
      const imageURL = await getDownloadURL(snapshot.ref);
      console.log(imageURL);
      setBoxImageURL(imageURL);
      // Close the PopUp thing
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <Popover
      open={popoverOpen}
      onOpenChange={(nextOpen) => {
        if (isEditing) setPopoverOpen(nextOpen);
      }}
    >
      <PopoverTrigger asChild>
        <div
          className={[
            "w-box h-box border-1 bg-box-bg flex flex-col relative",
            isEditing ? "hover:bg-amber-200" : "",
            popoverOpen ? "border-red-500 border-4 !bg-amber-200" : "",
            getColorString(),
            // "w-box h-box border-1 bg-box-bg flex flex-col hover:bg-amber-200 bg-linear-to-br from-blue-400 from-50% to-green-400 to-50% font-bold",
            // "bg-linear-to-r from-green-400 from-50% to-red-400 to-50%",
            // firstScoreWin && "!bg-blue-400 font-bold",
            // secondScoreWin && "!bg-green-400 font-bold",
            // thirdScoreWin && "!bg-yellow-400 font-bold",
            // finalScoreWin && "!bg-red-400 font-bold",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="absolute top-0  right-0.5 text-[9px] z-10">
            {boxNumber}
          </div>
          {box.image || boxImageURL ? (
            <img
              src={box.image ?? boxImageURL}
              className="flex justify-center items-center m-auto w-box"
            />
          ) : (
            <>
              <div
                className={`flex justify-center h-full items-center text-center font-${boxFont}`}
                style={{ fontSize: boxFontSize }}
              >
                {boxName}
              </div>
            </>
          )}
        </div>
      </PopoverTrigger>
      <BoxEditPopUp
        boxNumber={boxNumber}
        editBoxData={editBoxData}
        boxFont={boxFont}
        setBoxFont={setBoxFont}
        boxName={boxName}
        setBoxName={setBoxName}
        boxFontSize={boxFontSize}
        setBoxFontSize={setBoxFontSize}
        setBoxImage={setBoxImage}
        boxImageURL={boxImageURL}
        uploadImage={uploadImage}
      />
    </Popover>
  );
}
