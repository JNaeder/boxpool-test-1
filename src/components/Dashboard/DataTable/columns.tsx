import type { ColumnDef } from "@tanstack/react-table";
import type { Boxpool } from "@/types/boxpoolTypes";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { formatDate } from "@/helperFunctions";
import { Progress } from "@/components/ui/progress";

export const columns: ColumnDef<Boxpool>[] = [
  { accessorKey: "name", header: "Boxpool Name" },
  {
    header: "Boxes",
    cell: ({ row }) => {
      const boxesLength = Object.keys(row.original.boxes).length;
      return (
        <div className="flex flex-col items-center">
          <Progress value={boxesLength} className="" />
          <div>{boxesLength}/100</div>
        </div>
      );
    },
  },
  {
    header: "Game Date",
    cell: ({ row }) => {
      const boxpoolData: Boxpool = row.original;
      if (!boxpoolData.gameInfo) return;
      return <div>{formatDate(boxpoolData.gameInfo.date)}</div>;
    },
  },
  {
    header: "Matchup",
    cell: ({ row }) => {
      const boxpoolData: Boxpool = row.original;
      if (!boxpoolData.gameInfo) return;
      const { awayTeam, homeTeam } = boxpoolData.gameInfo.teams;

      return (
        <div className="flex justify-start items-center gap-3">
          <img src={awayTeam.logo} width={40} />
          <div className="font-bold text-xl">@</div>
          <img src={homeTeam.logo} width={40} />
        </div>
      );
    },
  },
  {
    header: "View",
    cell: ({ row }) => {
      const boxId = row.original.id;
      return (
        <Button asChild>
          <NavLink to={`/box/${boxId}`}>View</NavLink>
        </Button>
      );
    },
  },
];
