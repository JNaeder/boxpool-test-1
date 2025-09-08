import "./TopMenuBar.css";
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
      <div className="top-menu-bar-container">
        <div className="top-menu-bar-title">Boxpool</div>
        <div className="game-controls">
          <div onClick={prevGame}>&lt;</div>
          <div>{allGames.length} Games</div>
          <div onClick={nextGame}>&gt;</div>
        </div>
      </div>
    </>
  );
}
