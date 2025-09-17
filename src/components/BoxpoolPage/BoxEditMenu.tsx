import { Button } from "../ui/button";
import { Pencil, Save } from "lucide-react";
import ChooseGameMenu from "./ChooseGameMenu";

export default function BoxEditMenu({
  isEditing,
  setIsEditing,
  writeBoxDataToDB,
  updateEventId,
}: {
  isEditing: boolean;
  setIsEditing: Function;
  writeBoxDataToDB: Function;
  updateEventId: Function;
}) {
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
                writeBoxDataToDB();
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
      <ChooseGameMenu updateEventId={updateEventId} />
    </div>
  );
}
