import { getWeekScoreboard } from "../../apiFunctions";
import type { Game } from "../../types/gameTypes";
import type { GameInfo } from "@/types/boxpoolTypes";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import GameIcon from "./GameIcon";
import { updateEventIdInDB } from "@/lib/database";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { setCurrentBoxpoolData } from "@/slices/gameSlice";
import { gameToGameInfo } from "@/helperFunctions";

export default function ChooseGameMenu({}: {}) {
  const dispatch = useAppDispatch();

  const { currentBoxpoolData } = useAppSelector((store) => store.game);

  const [currentWeek, setCurrentWeek] = useState<number>(2);
  const [weekGames, setWeekGames] = useState<Game[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [selectedGameInfo, setSelectedGameInfo] = useState<GameInfo>();

  useEffect(() => {
    const getData = async () => {
      const data = await getWeekScoreboard(currentWeek);
      setWeekGames(data["events"]);
    };

    getData();
  }, [currentWeek]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Game</Button>
      </DialogTrigger>
      <DialogContent className="bg-black text-white sm:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>Choose Game</DialogTitle>
          <DialogDescription />
          {/* Week Chooser */}
          <div className="flex items-center space-x-2">
            <Button onClick={() => setCurrentWeek(currentWeek - 1)}>
              Left
            </Button>
            <div>Week: {currentWeek}</div>
            <Button onClick={() => setCurrentWeek(currentWeek + 1)}>
              Right
            </Button>
          </div>
        </DialogHeader>
        <RadioGroup
          onValueChange={(e) => {
            const selectedGame = weekGames.filter(
              (weekGame) => weekGame.id === e
            );
            if (!selectedGame) return;
            setSelectedGameInfo(gameToGameInfo(selectedGame[0]));
            setSelectedEventId(e);
          }}
        >
          <div className="grid grid-cols-3 gap-2">
            {weekGames.map((game, i) => {
              return <GameIcon key={i} game={game} />;
            })}
          </div>
        </RadioGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={async () => {
                if (currentBoxpoolData) {
                  await updateEventIdInDB(
                    currentBoxpoolData.id,
                    selectedEventId
                  );
                  dispatch(
                    setCurrentBoxpoolData({
                      ...currentBoxpoolData,
                      eventId: selectedEventId,
                      gameInfo: selectedGameInfo,
                    })
                  );
                }
              }}
            >
              Choose
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
