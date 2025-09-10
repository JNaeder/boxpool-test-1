import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

export default function PlaySelection({
  currentPlayNumber,
  setCurrentPlayNumber,
  isPaused,
  setIsPaused,
}: {
  currentPlayNumber: number;
  setCurrentPlayNumber: Function;
  isPaused: boolean;
  setIsPaused: Function;
}) {
  const nextPlay = () => {
    setCurrentPlayNumber(currentPlayNumber + 1);
  };
  const prevPlay = () => {
    setCurrentPlayNumber(currentPlayNumber - 1);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <>
      <div className="flex gap-2 items-center">
        <Button onClick={prevPlay} disabled={currentPlayNumber == 0}>
          <ChevronLeft />
        </Button>
        <div>Play {currentPlayNumber} of 200</div>
        <Button onClick={nextPlay} disabled={currentPlayNumber >= 200}>
          <ChevronRight />
        </Button>
        <Button onClick={togglePause}>{isPaused ? <Play /> : <Pause />}</Button>
      </div>
    </>
  );
}
