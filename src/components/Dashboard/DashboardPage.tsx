import { useEffect } from "react";
import { columns } from "./DataTable/columns";
import DataTable from "./DataTable/DataTable";
import { Button } from "../ui/button";
import { SquarePlus } from "lucide-react";
import { getAllUserBoxPoolData } from "@/helperFunctions";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setBoxPools } from "../../slices/userSlice";
import type { Boxpool } from "@/types/boxpoolTypes";
import { Spinner } from "../ui/shadcn-io/spinner";

export default function DashboardPage({}: {}) {
  const dispatch = useAppDispatch();
  const { user: currentUser, boxpools } = useAppSelector((store) => store.user);

  const getData = async () => {
    if (!currentUser) return;
    const userPools = await getAllUserBoxPoolData(currentUser);
    dispatch(setBoxPools(userPools as Boxpool[]));
  };

  useEffect(() => {
    getData();
  }, [currentUser]);

  if (boxpools.length === 0)
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
                onClick={() => console.log("New Boxpool")}
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
