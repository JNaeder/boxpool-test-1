import AuthButton from "./AuthButton";
import type { User } from "@/types";
import type { Auth } from "firebase/auth";
import BoxPoolLogo from "../assets/boxpool-logo-1.svg";
import { NavLink } from "react-router";

export default function TopMenuBar({
  auth,
  currentUser,
  setCurrentUser,
}: {
  auth: Auth;
  currentUser: User | null;
  setCurrentUser: Function;
}) {
  return (
    <>
      <div className="bg-black text-white flex justify-between items-center gap-5 h-[50px] px-10">
        <NavLink to={currentUser ? "/dashboard" : "/"}>
          <div className="flex items-center gap-2 justify-center">
            <img src={BoxPoolLogo} width={45} />
            <div className="text-4xl w-full ">boxpool.live</div>
          </div>
        </NavLink>
        <AuthButton
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          auth={auth}
        />
      </div>
    </>
  );
}
