import { useState } from "react";
import { useNavigate } from "react-router";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  type AuthError,
} from "firebase/auth";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

import { auth, googleProvider } from "@/lib/firebase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  const login = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error: AuthError) => {
        setLoginError(error.code);
      });
  };

  return (
    <>
      <div
        className={`flex justify-center items-center h-8 w-1/2 mx-auto border-red-500 ${
          loginError ? "border-2" : ""
        } rounded-2xl`}
      >
        {loginError ? (
          <div className="text-red-500">{loginError}</div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            onChange={(e) => {
              setLoginError("");
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            onChange={async (e) => {
              setLoginError("");
              setPassword(e.target.value);
            }}
          />
        </div>
        <Button onClick={login}>Login</Button>
        <Button
          variant="outline"
          onClick={() => {
            signInWithPopup(auth, googleProvider).then(() => {
              // console.log(result.user);
              navigate("/dashboard");
            });
          }}
        >
          Sign In With Google
        </Button>
      </div>
    </>
  );
}
