import type { ScoringPlay, Team } from "@/types/gameTypes";

export default function ScoringPlayItem({
  scoringPlay,
  teams,
}: {
  scoringPlay: ScoringPlay;
  teams: { [boxNumber: number]: Team };
}) {
  const scoringTeam = teams[Number(scoringPlay.team.id)];

  return (
    <>
      <div>
        <div
          className={`flex justify-center items-center w-full mx-auto rounded-2xl gap-2 mb-2`}
          style={{ backgroundColor: `#${scoringTeam.color}`, color: "white" }}
        >
          <img src={scoringPlay.team.logo} width={30} />
          <div>
            {scoringPlay.scoringType?.displayName ?? scoringPlay.type?.text}
          </div>
          <div>{scoringPlay.clock.displayValue}</div>
          <div></div>
        </div>
        <div>
          <div className="text-sm ">{scoringPlay.text}</div>
        </div>
      </div>
    </>
  );
}
