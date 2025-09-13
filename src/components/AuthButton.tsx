import { Button } from "./ui/button";
import type { User } from "@/types";
import { type Auth, signOut, signInWithEmailAndPassword } from "firebase/auth";

export default function AuthButton({
  auth,
  currentUser,
  setCurrentUser,
}: {
  auth: Auth;
  currentUser: User | null;
  setCurrentUser: Function;
}) {
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign Out Successful");
        setCurrentUser(null);
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
      {currentUser ? (
        <div className="flex items-center gap-2">
          <div>{currentUser.email}</div>
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
