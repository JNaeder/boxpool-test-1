import type { Game, Competitor } from "@/types";
import { RadioGroupItem } from "@/components/ui/radio-group";

export default function GameIcon({ game }: { game: Game }) {
  const competitors = game.competitions[0].competitors;
  const homeTeam: Competitor | undefined = competitors.find(
    (competitor) => competitor.homeAway === "home"
  );

  const awayTeam: Competitor | undefined = competitors.find(
    (competitor) => competitor.homeAway === "away"
  );

  const formatDate = (dateString: string) => {
    const newDate = new Date(dateString);
    const formatted = newDate.toLocaleString("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    });
    return formatted;
  };

  //   console.log(formatDate(game.date));

  //   console.log(game);
  return (
    <div className="bg-white text-black flex justify-center items-center rounded-lg">
      <div></div>
      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-2">
          <img src={awayTeam?.team.logo} width={40} />
          <div className="text-xl">{game.shortName}</div>
          <img src={homeTeam?.team.logo} width={40} />
        </div>
        <div>{formatDate(game.date)}</div>
      </div>
      <div>
        <RadioGroupItem value={game.id} id={game.id} />
      </div>
    </div>
  );
}
