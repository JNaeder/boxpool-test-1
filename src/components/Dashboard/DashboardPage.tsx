import DashboardBoxpoolItem from "./DashboardBoxpoolItem";
import { useAppSelector } from "@/hooks";

export default function DashboardPage({}: {}) {
  const { boxpools } = useAppSelector((store) => store.user);

  if (boxpools.length === 0) return <></>;
  return (
    <>
      <div className="w-full h-[calc(100dvh-50px)] flex flex-col items-center">
        <div className="font-bold text-4xl my-5">All Pools</div>
        <div className="flex flex-col items-center gap-5">
          {boxpools.map((boxpool, i) => (
            <DashboardBoxpoolItem key={i} boxpool={boxpool} />
          ))}
        </div>
      </div>
    </>
  );
}
