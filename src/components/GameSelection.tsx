import type { Game } from "../types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GameSelection({
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
    </>
  );
}
