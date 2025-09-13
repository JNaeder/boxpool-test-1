import type { GameSummary, Team } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScoringPlayItem from "@/ScoringPlayItem";

export default function ScoringPlays({
  gameSummary,
}: {
  gameSummary: GameSummary;
}) {
  const scoringPlays = gameSummary.scoringPlays;
  const teams = gameSummary.header.competitions[0].competitors.reduce(
    (acc, team) => ({
      ...acc,
      [team.id]: team.team,
    }),
    {} as Record<string, Team>
  );

  console.log(teams);
  //   console.log(scoringPlays);

  const firstQuarterPlays = scoringPlays.filter(
    (scoringPlay) => scoringPlay.period.number == 1
  );
  const secondQuarterPlays = scoringPlays.filter(
    (scoringPlay) => scoringPlay.period.number == 2
  );
  const thirdQuarterPlays = scoringPlays.filter(
    (scoringPlay) => scoringPlay.period.number == 3
  );
  const fourthQuarterPlays = scoringPlays.filter(
    (scoringPlay) => scoringPlay.period.number == 4
  );
  return (
    <>
      <div className=" flex flex-col items-center w-full  justify-center mt-3">
        <div>Scoring Plays</div>
        <Accordion type="multiple" className="w-full text-center">
          <AccordionItem value="item-1">
            <AccordionTrigger>Q1</AccordionTrigger>
            {firstQuarterPlays.map((play, i) => {
              return (
                <AccordionContent key={i}>
                  <ScoringPlayItem scoringPlay={play} teams={teams} />
                </AccordionContent>
              );
            })}
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Q2</AccordionTrigger>
            {secondQuarterPlays.map((play, i) => {
              return (
                <AccordionContent key={i}>
                  <ScoringPlayItem scoringPlay={play} teams={teams} />
                </AccordionContent>
              );
            })}
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Q3</AccordionTrigger>
            {thirdQuarterPlays.map((play, i) => {
              return (
                <AccordionContent key={i}>
                  <ScoringPlayItem scoringPlay={play} teams={teams} />
                </AccordionContent>
              );
            })}
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Q4</AccordionTrigger>
            {fourthQuarterPlays.map((play, i) => {
              return (
                <AccordionContent key={i}>
                  <ScoringPlayItem scoringPlay={play} teams={teams} />
                </AccordionContent>
              );
            })}
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
