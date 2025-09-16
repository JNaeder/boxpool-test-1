import type { GameSummary, Team } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScoringPlayItem from "./ScoringPlayItem";

export default function ScoringPlays({
  gameSummary,
}: {
  gameSummary: GameSummary;
}) {
  if (!gameSummary.scoringPlays) return <></>;

  const quaterNames: Record<number, string> = {
    1: "1st Quarter",
    2: "2nd Quarter",
    3: "3rd Quarter",
    4: "4th Quarter",
    5: "OT",
  };

  const scoringPlays = gameSummary.scoringPlays;
  const teams = gameSummary.header.competitions[0].competitors.reduce(
    (acc, team) => ({
      ...acc,
      [team.id]: team.team,
    }),
    {} as Record<string, Team>
  );

  const allQuarterPlays = [];
  const periodLength = gameSummary.header.competitions[0].status.period ?? 4;
  for (let i = 0; i < periodLength; i++) {
    const quarterPlays = scoringPlays.filter(
      (scoringPlay) => scoringPlay.period.number === i + 1
    );
    allQuarterPlays.push(quarterPlays);
  }
  return (
    <>
      <div className="flex flex-col items-center w-3/4 mx-auto justify-center">
        <div className="w-full text-center text-xl p-1 px-5 rounded-lg">
          Scoring Plays
        </div>
        <div className=" flex flex-col items-center w-full m-auto justify-start mt-1 border-2 p-1 rounded-lg bg-white max-h-150 overflow-auto">
          <Accordion type="multiple" className="w-full text-center">
            {allQuarterPlays.map((quarterPlay, i) => {
              return (
                <AccordionItem value={`item-${i + 1}`} key={i}>
                  <AccordionTrigger className="text-xl  justify-center">
                    {quaterNames[i + 1]}
                  </AccordionTrigger>
                  {quarterPlay.map((play, i) => {
                    return (
                      <AccordionContent key={i}>
                        <ScoringPlayItem scoringPlay={play} teams={teams} />
                      </AccordionContent>
                    );
                  })}
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </>
  );
}
