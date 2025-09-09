import type { Game } from "./types";

export default function TopMenuBar({
  allGames,
  setCurrentGame,
}: {
  allGames: Game[];
  setCurrentGame: Function;
}) {
  const nextGame = () => {
    setCurrentGame(allGames[1]);
  };
  const prevGame = () => {
    setCurrentGame(allGames[0]);
  };

  return (
    <>
      <div className="bg-black text-white flex justify-center items-center gap-5 h-[50px]">
        <div className="text-4xl">Boxpool</div>
        <div className="flex gap-2">
          <div onClick={prevGame}>&lt;</div>
          <div>{allGames.length} Games</div>
          <div onClick={nextGame}>&gt;</div>
        </div>
      </div>
    </>
  );
}
