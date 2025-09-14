import { Button } from "./ui/button";
import { Pencil, Save } from "lucide-react";

export default function BoxEditMenu({
  isEditing,
  setIsEditing,
  writeBoxDataToDB,
}: {
  isEditing: boolean;
  setIsEditing: Function;
  writeBoxDataToDB: Function;
}) {
  const updateIsEditing = (newState: boolean) => {
    setIsEditing(newState);
  };

  return (
    <div>
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
    </div>
  );
}
