import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import boxpoolLogo from "../../assets/boxpool-logo-1.svg";
import Login from "./Login";
import Signup from "./Signup";

export default function LoginSignUpPage() {
  return (
    <>
      <div className="bg-neutral-200 w-screen h-[calc(100vh-50px)]">
        <div className="bg-white m-auto w-1/2 p-20 rounded-2xl">
          <div className="flex justify-center items-center space-x-10 bg-black mb-10 rounded-2xl py-2">
            <img src={boxpoolLogo} width={100} />
            <div className="text-white text-4xl">boxpool.live</div>
          </div>
          <Tabs defaultValue="login">
            <TabsList className="mx-auto">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Signup</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Login />
            </TabsContent>
            <TabsContent value="signup">
              <Signup />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
