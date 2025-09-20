import { useState } from "react";
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

import { auth } from "@/lib/firebase";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCreds) => {
        console.log("Sign Up Successful", userCreds.user);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            onChange={(e) => {
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
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <Label htmlFor="verify-password">Verify Password</Label>
          <Input
            id="very-password"
            type="password"
            onChange={async (e) => {
              setVerifyPassword(e.target.value);
            }}
          />
          {verifyPassword && password && verifyPassword !== password ? (
            <>
              <div className="text-red-500">Passwords do not match</div>
            </>
          ) : (
            <></>
          )}
        </div>
        <Button
          onClick={signup}
          disabled={
            !email ||
            !password ||
            !verifyPassword ||
            verifyPassword !== password
          }
        >
          Signup
        </Button>
      </div>
    </>
  );
}
