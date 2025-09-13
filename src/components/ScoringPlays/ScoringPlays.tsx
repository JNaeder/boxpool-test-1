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

  const scoringPlays = gameSummary.scoringPlays;
  const teams = gameSummary.header.competitions[0].competitors.reduce(
    (acc, team) => ({
      ...acc,
      [team.id]: team.team,
    }),
    {} as Record<string, Team>
  );

  const allQuarterPlays = [];
  for (let i = 0; i < 4; i++) {
    const quarterPlays = scoringPlays.filter(
      (scoringPlay) => scoringPlay.period.number === i + 1
    );
    allQuarterPlays.push(quarterPlays);
  }
  return (
    <>
      <div className=" flex flex-col items-center w-3/4 m-auto justify-center mt-3 border-2 p-3 rounded-lg bg-white">
        <div className="bg-black text-white text-2xl p-1 px-5 rounded-lg">
          Scoring Plays
        </div>
        <Accordion type="multiple" className="w-full text-center">
          {allQuarterPlays.map((quarterPlay, i) => {
            return (
              <AccordionItem value={`item-${i + 1}`} key={i}>
                <AccordionTrigger className="text-xl  justify-center">{`Q${
                  i + 1
                }`}</AccordionTrigger>
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
    </>
  );
}
