import type { Game } from "../types";
import GameSelection from "./GameSelection";

export default function TopMenuBar({
  allGames,
  currentGameIndex,
  setCurrentGameIndex,
}: {
  allGames: Game[];
  currentGameIndex: number;
  setCurrentGameIndex: Function;
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
      </div>
    </>
  );
}
