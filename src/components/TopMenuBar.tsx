import type { Game } from "../types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TopMenuBar({
  allGames,
  currentGameIndex,
  setCurrentGameIndex,
}: {
  allGames: Game[];
  currentGameIndex: number;
  setCurrentGameIndex: Function;
}) {
  const nextGame = () => {
    setCurrentGameIndex(currentGameIndex + 1);
  };
  const prevGame = () => {
    setCurrentGameIndex(currentGameIndex - 1);
  };

  return (
    <>
      <div className="bg-black text-white flex justify-center items-center gap-5 h-[50px]">
        <div className="text-4xl">Boxpool</div>
        <div className="flex gap-2 items-center">
          <Button onClick={prevGame} disabled={currentGameIndex == 0}>
            <ChevronLeft />
          </Button>
          <div>
            Game {currentGameIndex + 1} of {allGames.length}
          </div>
          <Button
            onClick={nextGame}
            disabled={currentGameIndex === allGames.length - 1}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </>
  );
}
