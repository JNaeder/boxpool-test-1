import { useState } from "react";
import type { WinningScore } from "../../types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function BoxSquare({
  name,
  boxNumber,
  winningNumbers,
  quarterScores,
  period,
  completed,
}: {
  name?: string;
  boxNumber: number;
  winningNumbers: WinningScore;
  quarterScores: WinningScore[];
  period: number | undefined;
  completed: boolean;
}) {
  const [boxName, setBoxName] = useState<string | undefined>(name);

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

  const editBox = () => {
    console.log(boxName, boxNumber);
  };

  // console.log(quarterScores, winningNumbers);

  return (
    <Popover>
      <PopoverTrigger>
        <div
          className={[
            "w-box h-box border-1 bg-box-bg flex flex-col",
            "hover:bg-amber-200",
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
            {/* <Button
          variant="ghost"
          className="w-0.5 h-0.5 text-black"
          onClick={editBox}
          >
          </Button> */}
            <div className="text-[9px] flex flex-col text-right pr-0.5">
              {boxNumber}
            </div>
          </div>
          <div className="flex justify-center text-sm">{boxName}</div>
        </div>
      </PopoverTrigger>
      <PopoverContent onPointerDownOutside={() => console.log("outside")}>
        <div className="flex flex-col">
          <Label htmlFor="boxName">Name:</Label>
          <Input
            id="boxName"
            type="text"
            value={boxName}
            maxLength={10}
            onChange={(e) => setBoxName(e.target.value)}
          />
          <Button onClick={editBox}>Enter</Button>
          <Button variant={"destructive"}>Clear</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
