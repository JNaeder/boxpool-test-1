import { Button } from "../ui/button";
import { Pencil, Save } from "lucide-react";
import ChooseGameMenu from "./ChooseGameMenu";
import { writeBoxDataToDB } from "@/lib/database";
import { useAppSelector } from "@/hooks";

export default function BoxEditMenu({
  isEditing,
  setIsEditing,
  boxId,
}: {
  isEditing: boolean;
  setIsEditing: Function;
  boxId: string;
}) {
  const { currentBoxpoolData } = useAppSelector((store) => store.game);

  const updateIsEditing = (newState: boolean) => {
    setIsEditing(newState);
  };

  return (
    <div className="w-full flex justify-center p-2 space-x-3 mb-10">
      <div>
        {isEditing ? (
          <>
            <Button
              onClick={() => {
                writeBoxDataToDB(boxId, currentBoxpoolData);
                updateIsEditing(false);
              }}
            >
              <Save />
              Save
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => updateIsEditing(true)}>
              <Pencil />
              Edit
            </Button>
          </>
        )}
      </div>
      {isEditing && <ChooseGameMenu />}
    </div>
  );
}
