import type { Boxpool } from "@/types";
import { Button } from "../ui/button";
import { NavLink } from "react-router";

export default function DashboardBoxpoolItem({
  boxpool,
}: {
  boxpool: Boxpool;
}) {
  return (
    <>
      <div className="bg-neutral-500 w-fit p-3 px-10 rounded-lg flex flex-col gap-2 items-center">
        <div className="font-bold">{boxpool.name}</div>
        <Button asChild>
          <NavLink to={`/box/${boxpool.id}`}>View</NavLink>
        </Button>
      </div>
    </>
  );
}
