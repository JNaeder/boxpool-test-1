import { useState } from "react";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import boxpoolLogo from "../../assets/boxpool-logo-1.svg";

import { auth, googleProvider } from "@/lib/firebase";

export default function LoginSignUpPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = async () => {
    signInWithEmailAndPassword(auth, email, password).then(() => {
      navigate("/dashboard");
    });
  };

  return (
    <>
      <div className="bg-neutral-200 w-screen h-[calc(100vh-50px)]">
        <div className="bg-white m-auto w-1/2 p-20 rounded-2xl">
          <div className="flex justify-center items-center space-x-10 bg-black mb-10 rounded-2xl py-2">
            <img src={boxpoolLogo} width={100} />
            <div className="text-white text-4xl">boxpool.live</div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                onChange={async (e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <Button onClick={login}>Login</Button>
            <Button
              variant="outline"
              onClick={() => {
                signInWithPopup(auth, googleProvider).then((result) => {
                  console.log(result.user);
                  navigate("/dashboard");
                });
              }}
            >
              Sign In With Google
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
