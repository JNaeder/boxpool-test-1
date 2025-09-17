import { Button } from "./ui/button";
import { type Auth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { setCurrentUser } from "@/slices/userSlice";

export default function AuthButton({ auth }: { auth: Auth }) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.user);

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign Out Successful");
        dispatch(setCurrentUser(null));
      })
      .catch((error) => console.error(error));
  };

  const email = "madhead324@gmail.com";
  const password = "test123";

  // const email = "john@gmail.com";
  // const password = "123456";

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCreds) => {
      // console.log(userCreds.user);
      setCurrentUser(userCreds.user);
    });
  };

  return (
    <>
      {user ? (
        <div className="flex items-center gap-2">
          <div>{user.email}</div>
          <Button onClick={signOutUser}>Sign Out</Button>
        </div>
      ) : (
        <div>
          <Button onClick={loginUser}>Login</Button>
        </div>
      )}
    </>
  );
}
