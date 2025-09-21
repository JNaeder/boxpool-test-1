import { useAppDispatch } from "@/hooks";
import { editNumberBoxData } from "@/slices/gameSlice";

import { Input } from "../ui/input";

export default function NumberSquare({
  number,
  isEditing,
  boxNumber,
  homeAway,
}: {
  number: string;
  isEditing: boolean;
  boxNumber: number;
  homeAway: "home" | "away";
}) {
  const dispatch = useAppDispatch();

  return (
    <div
      className={`w-box h-box content-center text-center border-black border-1 text-2xl`}
    >
      {isEditing ? (
        <Input
          type="number"
          value={number}
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          onChange={(e) =>
            dispatch(
              editNumberBoxData({
                boxNumber: boxNumber,
                newValue: Number(e.target.value),
                homeAway: homeAway,
              })
            )
          }
        />
      ) : (
        number
      )}
    </div>
  );
}
