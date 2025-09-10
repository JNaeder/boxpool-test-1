import type { Game } from "../types";
import GameSelection from "./GameSelection";
import PlaySelection from "./PlaySelection";

export default function TopMenuBar({
  allGames,
  currentGameIndex,
  setCurrentGameIndex,
  currentPlayNumber,
  setCurrentPlayNumber,
  isPaused,
  setIsPaused,
}: {
  allGames: Game[];
  currentGameIndex: number;
  setCurrentGameIndex: Function;
  currentPlayNumber: number;
  setCurrentPlayNumber: Function;
  isPaused: boolean;
  setIsPaused: Function;
}) {
  return (
    <>
      <div className="bg-black text-white flex justify-center items-center gap-5 h-[50px]">
        <div className="text-4xl">Boxpool</div>
        <GameSelection
          allGames={allGames}
          currentGameIndex={currentGameIndex}
          setCurrentGameIndex={setCurrentGameIndex}
        />
        <PlaySelection
          currentPlayNumber={currentPlayNumber}
          setCurrentPlayNumber={setCurrentPlayNumber}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
        />
      </div>
    </>
  );
}
