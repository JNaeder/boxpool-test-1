import { useAppSelector } from "@/hooks";
import { columns } from "./DataTable/columns";
import DataTable from "./DataTable/DataTable";
import { Button } from "../ui/button";
import { SquarePlus } from "lucide-react";

export default function DashboardPage({}: {}) {
  const { boxpools } = useAppSelector((store) => store.user);

  if (boxpools.length === 0) return <></>;
  return (
    <>
      <div className=" w-screen h-[calc(100dvh-50px)] bg-neutral-200">
        <div className="flex">
          <div className="flex-1 flex justify-center">
            <div className="flex flex-col items-left">
              <div>
                <span className="font-bold">Total Boxpools:</span>{" "}
                {boxpools.length}
              </div>
            </div>
          </div>
          <div className="w-1/4 pt-4 flex-2 flex flex-col">
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
