import { Button } from "./ui/button";
import { type Auth, signOut } from "firebase/auth";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { setCurrentUser } from "@/slices/userSlice";
import { NavLink, useNavigate } from "react-router";

export default function AuthButton({ auth }: { auth: Auth }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((s) => s.user);

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        dispatch(setCurrentUser(null));
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  // const email = "madhead324@gmail.com";
  // const password = "test123";

  // const email = "john@gmail.com";
  // const password = "123456";

  return (
    <>
      {user ? (
        <div className="flex items-center gap-2">
          <div>{user.email}</div>
          <Button onClick={signOutUser}>Sign Out</Button>
        </div>
      ) : (
        <div>
          <Button asChild>
            <NavLink to="/login">Login</NavLink>
          </Button>
        </div>
      )}
    </>
  );
}
