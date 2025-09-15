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
  const [boxFont, setBoxFont] = useState<string>(box.font ?? "Arial");
  const [boxFontSize, setBoxFontSize] = useState<number>(box.fontSize ?? 14);
  const [boxImage, setBoxImage] = useState<File | undefined>();
  const [boxImageURL, setBoxImageURL] = useState<string>("");
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  const BG: Record<string, string> = {
    red: "!bg-red-400",
    blue: "!bg-blue-400",
    green: "!bg-green-400",
    yellow: "!bg-yellow-400",
  };

  const FROM: Record<string, string> = {
    red: "from-red-400",
    blue: "from-blue-400",
    green: "from-green-400",
    yellow: "from-yellow-400",
  };
  const TO: Record<string, string> = {
    red: "to-red-400",
    blue: "to-blue-400",
    green: "to-green-400",
    yellow: "to-yellow-400",
  };
  const VIA: Record<string, string> = {
    red: "via-red-400",
    blue: "via-blue-400",
    green: "via-green-400",
    yellow: "via-yellow-400",
  };

  type ColorState = {
    color: string;
    state: boolean;
  };
  const winColorStates: ColorState[] = [
    {
      color: "blue",
      state:
        (period ?? 0) >= 1 || completed
          ? quarterScores[0].homeScore % 10 === winningNumbers.homeScore &&
            quarterScores[0].awayScore % 10 === winningNumbers.awayScore
          : false,
    },
    {
      color: "green",
      state:
        (period ?? 0) >= 2 || completed
          ? quarterScores[1].homeScore % 10 === winningNumbers.homeScore &&
            quarterScores[1].awayScore % 10 === winningNumbers.awayScore
          : false,
    },
    {
      color: "yellow",
      state:
        (period ?? 0) >= 3 || completed
          ? quarterScores[2].homeScore % 10 === winningNumbers.homeScore &&
            quarterScores[2].awayScore % 10 === winningNumbers.awayScore
          : false,
    },
    {
      color: "red",
      state:
        (period ?? 0) >= 4 || completed
          ? quarterScores[3].homeScore % 10 === winningNumbers.homeScore &&
            quarterScores[3].awayScore % 10 === winningNumbers.awayScore
          : false,
    },
  ];

  const winners = winColorStates.filter((state) => state.state);

  const getColorString = (): string => {
    if (winners.length === 1) {
      return [BG[winners[0].color], "font-bold"].filter(Boolean).join(" ");
    } else if (winners.length === 2) {
      return [
        "bg-gradient-to-br",
        FROM[winners[0].color],
        "from-[50%]",
        TO[winners[1].color],
        "to-[50%]",
        "font-bold",
      ]
        .filter(Boolean)
        .join(" ");
    } else if (winners.length === 3) {
      return [
        "bg-gradient-to-br",
        FROM[winners[0].color],
        "from-[33%]",
        VIA[winners[0].color],
        "via-[50%]",
        VIA[winners[1].color],
        "via-[50%]",
        VIA[winners[1].color],
        "via-[80%]",
        TO[winners[2].color],
        "to-[80%]",
        "font-bold",
      ]
        .filter(Boolean)
        .join(" ");
    } else {
      return "";
    }
  };

  const uploadImage = async () => {
    if (!boxImage) return;
    try {
      const imageRef = ref(
        storage,
        `boxesImages/${userId}/${boxImage.name}-${crypto.randomUUID()}`
      );
      const snapshot = await uploadBytes(imageRef, boxImage);
      const imageURL = await getDownloadURL(snapshot.ref);
      console.log(imageURL);
      setBoxImageURL(imageURL);
      setPopoverOpen(false);
      writeBoxData(imageURL);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const writeBoxData = (imageURL?: string) => {
    const newData = {
      ...(boxName && { name: boxName }),
      ...(boxFont && { font: boxFont }),
      ...(boxFontSize && { fontSize: boxFontSize }),
      ...((boxImageURL || imageURL) && { image: boxImageURL || imageURL }),
    };
    console.log("Editing Box", boxNumber, newData);
    editBoxData(boxNumber, newData);
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
            popoverOpen ? " !bg-amber-200" : "",
            getColorString(),
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
                className={`flex justify-center h-full items-center text-center`}
                style={{
                  fontSize: boxFontSize,
                  fontFamily: `${boxFont}`,
                }}
              >
                {boxName}
              </div>
            </>
          )}
        </div>
      </PopoverTrigger>
      <BoxEditPopUp
        boxNumber={boxNumber}
        boxFont={boxFont}
        setBoxFont={setBoxFont}
        boxName={boxName}
        setBoxName={setBoxName}
        boxFontSize={boxFontSize}
        setBoxFontSize={setBoxFontSize}
        setBoxImage={setBoxImage}
        uploadImage={uploadImage}
        writeBoxData={writeBoxData}
      />
    </Popover>
  );
}
