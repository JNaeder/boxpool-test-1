import { useEffect, useState } from "react";
import { columns } from "./DataTable/columns";
import DataTable from "./DataTable/DataTable";
import { Button } from "../ui/button";
import { SquarePlus } from "lucide-react";
import { getAllUserBoxPoolData } from "@/helperFunctions";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setBoxPools } from "../../slices/userSlice";
import type { Boxpool } from "@/types/boxpoolTypes";
import { Spinner } from "../ui/shadcn-io/spinner";
import { createNewBoxpoolInDB } from "@/lib/database";
import { useNavigate } from "react-router";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user: currentUser, boxpools } = useAppSelector((store) => store.user);

  const [boxPoolsLoading, setBoxPoolsLoading] = useState(true);

  const getData = async () => {
    if (!currentUser) return;
    const userPools = await getAllUserBoxPoolData(currentUser);
    dispatch(setBoxPools(userPools as Boxpool[]));
    setBoxPoolsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [currentUser]);

  const createNewBoxpool = async () => {
    if (currentUser) {
      const boxpoolId = await createNewBoxpoolInDB(currentUser.uid);
      // console.log("Create New Boxpool", boxpoolId);
      navigate(`/box/${boxpoolId}`);
    }
  };

  if (!currentUser || boxPoolsLoading)
    return (
      <>
        <div className="b h-[calc(100vh-50px)] flex flex-col justify-center items-center">
          <Spinner size={100} />
        </div>
      </>
    );
  return (
    <>
      <div className=" w-screen h-[calc(100dvh-50px)] bg-neutral-200">
        <div className="flex">
          <div className="flex-1"></div>
          <div className="pt-4 flex-2 flex flex-col">
            <div className="mb-2 flex justify-end pr-2">
              <Button
                className="bg-blue-500 hover:bg-blue-600 border text-black"
                onClick={createNewBoxpool}
              >
                <SquarePlus />
                Create New
              </Button>
            </div>
            <DataTable columns={columns} data={boxpools} />
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
    </>
  );
}
