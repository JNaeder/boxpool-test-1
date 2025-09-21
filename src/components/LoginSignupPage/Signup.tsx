import { useState } from "react";
import { useNavigate } from "react-router";
import {
  createUserWithEmailAndPassword,
  validatePassword,
  type PasswordValidationStatus,
} from "firebase/auth";
import validator from "validator";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

import { auth } from "@/lib/firebase";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>();
  const [password, setPassword] = useState<string>("");
  const [passwordValid, setPasswordValid] =
    useState<PasswordValidationStatus>();
  const [verifyPassword, setVerifyPassword] = useState<string>("");

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // console.log("Sign Up Successful", userCreds.user);
        // sendEmailVerification(userCreds.user).then(() => {
        //   console.log("Verification email sent");
        // });
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
              const isValidEmail = validator.isEmail(e.target.value);
              setIsValidEmail(isValidEmail);
              setEmail(e.target.value);
            }}
          />
          <div className="h-6">
            {email && !isValidEmail ? (
              <>
                <div className="text-red-500">{`Invalid email address`}</div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            onChange={async (e) => {
              const policyStatus = await validatePassword(auth, e.target.value);
              setPasswordValid(policyStatus);
              setPassword(e.target.value);
            }}
          />
          <div className="h-6">
            {password.length > 0 && !passwordValid?.isValid ? (
              <>
                <div className="text-red-500">
                  {`Password must be at least ${passwordValid?.passwordPolicy.customStrengthOptions.minPasswordLength}
                  characters`}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
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
          <div className="h-6">
            {verifyPassword && password && verifyPassword !== password ? (
              <>
                <div className="text-red-500">{`Passwords do not match`}</div>
              </>
            ) : (
              <></>
            )}
          </div>
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
