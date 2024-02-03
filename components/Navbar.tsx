"use client";

import React from "react";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import Logo from "./nav/Logo";
import { useAuth } from "@/context/userContext";
import Rightside from "./nav/rightside";
import { User } from "@prisma/client";
import Leftside from "./nav/leftside";
import NavItems from "./nav/navItems";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = ({
  isAuthenticated,
}: {
  isAuthenticated: RequestCookie | undefined;
}) => {
  const { user } = useAuth();
  return (
    <>
      <div className="inline-flex items-center justify-between w-full text-sm font-medium bg-transparent border-input h-14 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
        <div>
          <div className="flex items-center ml-4">
            {isAuthenticated ? <Leftside /> : <div className="-mb-10" />}
            <Logo />
            {isAuthenticated ? null : <NavItems />}
          </div>
        </div>
        {isAuthenticated ? (
          <Rightside user={user as User} />
        ) : (
          <div className="flex items-center justify-center h-auto gap-3 mr-4">
            <Link href={"/login"}>
              <Button variant={"ghost"}>Sign in</Button>
            </Link>
            <Link href={"/signup"}>
              <Button variant={"outline"}>Sign up</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
