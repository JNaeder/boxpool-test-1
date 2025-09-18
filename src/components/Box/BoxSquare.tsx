// React
import { useState } from "react";

// Redux
import { useAppDispatch } from "@/hooks";
import { editBoxData } from "@/slices/gameSlice";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import BoxEditPopUp from "./BoxEditPopUp";
import { uploadImageToStorage } from "@/lib/database";
import type { WinningScore, Box } from "../../types/boxpoolTypes";

export default function BoxSquare({
  box,
  boxNumber,
  winningNumbers,
  quarterScores,
  period,
  completed,
  isEditing,
  userId,
}: {
  box: Box;
  boxNumber: number;
  winningNumbers: WinningScore;
  quarterScores: WinningScore[];
  period: number | undefined;
  completed: boolean;
  isEditing: boolean;
  userId: string;
}) {
  const dispatch = useAppDispatch();

  const [boxName, setBoxName] = useState<string>(box.name ?? "");
  const [boxFont, setBoxFont] = useState<string>(box.font ?? "Arial");
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

  const getColorGradient = (): React.CSSProperties | undefined => {
    const colorMap: Record<string, string> = {
      red: "#f87171",
      blue: "#60a5fa",
      green: "#4ade80",
      yellow: "#facc15",
    };

    if (winners.length === 1) {
      return { backgroundColor: colorMap[winners[0].color] };
    } else if (winners.length === 2) {
      return {
        background: `linear-gradient(to bottom right, ${
          colorMap[winners[0].color]
        } 0% 50%, ${colorMap[winners[1].color]} 50% 100%`,
      };
    } else if (winners.length === 3) {
      return {
        background: `linear-gradient(to bottom right, ${
          colorMap[winners[0].color]
        } 0% 33.33%, ${colorMap[winners[1].color]} 33.33% 66.66%, ${
          colorMap[winners[2].color]
        } 66.66% 100%)`,
      };
    } else if (winners.length === 4) {
      return {
        background: `linear-gradient(to bottom right, ${
          colorMap[winners[0].color]
        } 0% 25%, ${colorMap[winners[1].color]} 25% 50%, ${
          colorMap[winners[2].color]
        } 50% 75%, ${colorMap[winners[3].color]} 75% 100%)`,
      };
    }
  };

  const uploadImage = async () => {
    if (!boxImage) return;
    const imageURL = await uploadImageToStorage(boxImage, userId);
    setBoxImageURL(imageURL);
    setPopoverOpen(false);
    writeBoxData(imageURL);
  };

  const writeBoxData = (imageURL?: string) => {
    const newData = {
      ...(boxName && { name: boxName }),
      ...(boxFont && { font: boxFont }),
      ...(boxFontSize && { fontSize: boxFontSize }),
      ...((boxImageURL || imageURL) && { image: boxImageURL || imageURL }),
    };
    console.log("Editing Box", boxNumber, newData);
    dispatch(editBoxData({ boxNumber: boxNumber, newData: newData }));
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
            "w-box h-box border-1 bg-box-bg flex flex-col relative overflow-hidden",
            isEditing ? "hover:bg-amber-200" : "",
            popoverOpen ? " !bg-amber-200" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={getColorGradient()}
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
