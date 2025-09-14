import { useState } from "react";
import type { WinningScore, Box } from "../../types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BoxSquare({
  box,
  boxNumber,
  winningNumbers,
  quarterScores,
  period,
  completed,
  isEditing,
  editBoxData,
}: {
  box: Box;
  boxNumber: number;
  winningNumbers: WinningScore;
  quarterScores: WinningScore[];
  period: number | undefined;
  completed: boolean;
  isEditing: boolean;
  editBoxData: Function;
}) {
  const [boxName, setBoxName] = useState<string>(box.name ?? "");
  const [boxFont, setBoxFont] = useState<string>(box.font ?? "normal");
  const [boxFontSize, setBoxFontSize] = useState<number>(box.fontSize ?? 14);
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

  // if (winners.length > 0) {
  //   console.log(winners);
  // }

  const getColorString = (): string => {
    if (winners.length == 1) {
      return `!bg-${winners[0].color} font-bold`;
    } else if (winners.length == 2) {
      return `bg-linear-to-br from-${winners[0].color} from-50% to-${winners[1].color} to-50% font-bold`;
    } else {
      return "";
    }
  };

  // console.log(quarterScores, winningNumbers);

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
            "w-box h-box border-1 bg-box-bg flex flex-col",
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
          <div className="flex justify-between">
            <div className="text-[10px] flex flex-col text-right pr-1 w-full">
              {boxNumber}
            </div>
          </div>
          <div
            className={`flex justify-center h-full items-start text-center font-${boxFont}`}
            style={{ fontSize: boxFontSize }}
          >
            {boxName}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col">
          <div className="font-bold text-lg text-center">Box #{boxNumber}</div>
          <Label htmlFor="boxName" className="mb-1">
            Name:
          </Label>
          <Input
            id="boxName"
            type="text"
            value={boxName}
            maxLength={20}
            onChange={(e) => {
              setBoxName(e.target.value);
              editBoxData(boxNumber, "name", e.target.value);
            }}
          />
          <Label htmlFor="fontSelect" className="mb-1">
            Font:
          </Label>
          <Select
            name="fontSelect"
            value={boxFont}
            onValueChange={(e) => {
              setBoxFont(e);
              editBoxData(boxNumber, "font", e);
            }}
          >
            <SelectTrigger className="w-full mb-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal" className="font-normal">
                Normal
              </SelectItem>
              <SelectItem value="mono" className="font-mono">
                Mono
              </SelectItem>
              <SelectItem value="sans" className="font-sans">
                Sans
              </SelectItem>
              <SelectItem value="asset" className="font-asset">
                Asset
              </SelectItem>
              <SelectItem value="bungee-shade" className="font-bungee-shade">
                Bungee Shade
              </SelectItem>
              <SelectItem value="rye" className="font-rye">
                Rye
              </SelectItem>
            </SelectContent>
          </Select>
          <Label htmlFor="fontSize" className="mb-1">
            Font Size:
          </Label>
          <Input
            id="fontSize"
            type="number"
            value={boxFontSize}
            onChange={(e) => {
              setBoxFontSize(Number(e.target.value));
              editBoxData(boxNumber, "fontSize", Number(e.target.value));
            }}
          />
          {/* <Button onClick={editBox}>Enter</Button> */}
          <Button variant={"destructive"}>
            <Trash2 />
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
