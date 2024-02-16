import React from "react";
import { LoginButton } from "./auth/login-button";
import { Button } from "./ui/button";

const LoginRequired = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen ">
      <div>
        <h1 className="text-4xl">⛔ Login is Required! ⛔ </h1>
        <LoginButton asChild mode={"modal"}>
          <Button variant="outline" className="w-full mt-5" size="lg">
            Sign in
          </Button>
        </LoginButton>
      </div>
    </div>
  );
};

export default LoginRequired;
