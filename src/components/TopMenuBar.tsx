import AuthButton from "./AuthButton";
import type { User } from "@/types";
import type { Auth } from "firebase/auth";
import BoxPoolLogo from "../assets/boxpool-logo-1.svg";
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { plusOne, setValue } from "@/slices/testSlice";

export default function TopMenuBar({
  auth,
  currentUser,
  setCurrentUser,
}: {
  auth: Auth;
  currentUser: User | null;
  setCurrentUser: Function;
}) {
  const numberValue = useAppSelector((s) => s.test);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="bg-black text-white flex justify-between items-center gap-5 h-[50px] px-10">
        <NavLink to={currentUser ? "/dashboard" : "/"}>
          <div className="flex items-center gap-2 justify-center">
            <img src={BoxPoolLogo} width={45} />
            <div className="text-4xl w-full ">boxpool.live</div>
          </div>
        </NavLink>
        <div className="flex items-center justify-center space-x-5">
          <Button
            onClick={() => {
              dispatch(setValue(69));
            }}
          >
            Set to 69
          </Button>
          <Button
            onClick={() => {
              dispatch(plusOne());
            }}
          >
            Increase
          </Button>
          <div>{numberValue}</div>
        </div>
        <AuthButton
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          auth={auth}
        />
      </div>
    </>
  );
}
