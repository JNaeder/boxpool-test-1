export default function ScoreboardTitleBox({ text }: { text: string }) {
  return (
    <div className="flex w-score-box-width h-score-box-height justify-center items-end font-bold text-l">
      {text}
    </div>
  );
}
