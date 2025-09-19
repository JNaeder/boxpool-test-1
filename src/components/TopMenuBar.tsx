import AuthButton from "./AuthButton";
import BoxPoolLogo from "../assets/boxpool-logo-1.svg";
import { NavLink } from "react-router";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { auth } from "@/lib/firebase";
import { clearGameAndBoxPoolData } from "@/slices/gameSlice";
import { clearBoxPools } from "@/slices/userSlice";

export default function TopMenuBar() {
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAppSelector((s) => s.user);

  return (
    <>
      <div className="bg-black text-white flex justify-between items-center gap-5 h-[50px] px-10">
        <NavLink
          to={currentUser ? "/dashboard" : "/"}
          onClick={() => {
            dispatch(clearGameAndBoxPoolData());
            dispatch(clearBoxPools());
          }}
        >
          <div className="flex items-center gap-2 justify-center">
            <img src={BoxPoolLogo} width={45} />
            <div className="text-4xl w-full ">boxpool.live</div>
          </div>
        </NavLink>

        <AuthButton auth={auth} />
      </div>
    </>
  );
}
