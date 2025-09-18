import { useAppDispatch, useAppSelector } from "@/hooks";
import { addGameInfoToBoxpoolData } from "@/slices/gameSlice";
import { Button } from "./ui/button";
import { updateBoxpoolDataInDB } from "./../lib/database";

export default function AddGameInfoButton() {
  const dispatch = useAppDispatch();

  const { currentGameSummary, currentBoxpoolData } = useAppSelector(
    (store) => store.game
  );
  const updateGameInfo = () => {
    if (!currentGameSummary) return;

    const game = currentGameSummary.header;
    const awayTeam = game.competitions[0].competitors.find(
      (team) => team.homeAway === "away"
    );
    const homeTeam = game.competitions[0].competitors.find(
      (team) => team.homeAway === "home"
    );

    if (homeTeam && awayTeam) {
      const gameInfo = {
        date: game.competitions[0].date,
        teams: {
          awayTeam: {
            name: awayTeam?.team.name,
            abbreviation: awayTeam?.team.abbreviation,
            primaryColor: awayTeam?.team.color,
            logo: awayTeam?.team.logos[0],
          },
          homeTeam: {
            name: homeTeam?.team.name,
            abbreviation: homeTeam?.team.abbreviation,
            primaryColor: homeTeam?.team.color,
            logo: homeTeam?.team.logos[0],
          },
        },
      };

      dispatch(addGameInfoToBoxpoolData(gameInfo));
      const newBoxpoolData = structuredClone(currentBoxpoolData);
      if (newBoxpoolData) {
        newBoxpoolData.gameInfo = gameInfo;
        updateBoxpoolDataInDB(newBoxpoolData.id, newBoxpoolData);
      }
    }
  };

  return <Button onClick={updateGameInfo}>Add Game Info</Button>;
}
