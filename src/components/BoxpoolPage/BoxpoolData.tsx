import { useAppSelector, useAppDispatch } from "@/hooks";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { formatDate } from "@/helperFunctions";
import { setCurrentBoxpoolData } from "../../slices/gameSlice";
import type { Boxpool } from "@/types/boxpoolTypes";

export default function BoxpoolData({ isEditing }: { isEditing: boolean }) {
  const dispatch = useAppDispatch();

  const { currentBoxpoolData } = useAppSelector((store) => store.game);
  const [boxpoolName, setBoxpoolName] = useState<string | undefined>(
    currentBoxpoolData?.name
  );

  const createdDate = currentBoxpoolData?.createdAt
    ? formatDate(currentBoxpoolData.createdAt)
    : "";

  const lastUpdatedDate = currentBoxpoolData?.lastUpdated
    ? formatDate(currentBoxpoolData.lastUpdated)
    : "";

  const updateBoxpoolData = async () => {
    if (!boxpoolName) return;
    const newBoxpoolData = {
      ...currentBoxpoolData,
      name: boxpoolName,
    } as Boxpool;
    dispatch(setCurrentBoxpoolData(newBoxpoolData));
  };

  return (
    <>
      <div className="text-centerrounded-xl m-2 flex flex-col p-2 justify-center items-center border rounded-xl gap-2">
        <div className="bg-black text-white rounded-xl w-full text-center">
          Info
        </div>
        {isEditing ? (
          <>
            <div className="flex justify-center items-center gap-4">
              <Label htmlFor="boxpool_name">Name:</Label>
              <Input
                id="boxpool_name"
                defaultValue={boxpoolName}
                onChange={(e) => setBoxpoolName(e.target.value)}
                onBlur={updateBoxpoolData}
              />
            </div>
          </>
        ) : (
          <>
            <div>{boxpoolName || "No Boxpool Name"}</div>
          </>
        )}
        {createdDate ? (
          <>
            <div>Created: {createdDate}</div>
          </>
        ) : (
          <></>
        )}
        <div>Last Updated: {lastUpdatedDate}</div>
      </div>
    </>
  );
}
