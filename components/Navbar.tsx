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
import { useParams } from "next/navigation";

const Navbar = ({ isAuthenticated }: { isAuthenticated: any }) => {
  const { user } = useAuth();
  const params = useParams();
  return (
    <>
      <div className="sticky inline-flex items-center justify-between w-full text-sm font-medium top-1 bg-card h-14">
        <div>
          <div className="flex items-center ml-4">
            {isAuthenticated ? <Leftside /> : <div className="-mb-10" />}
            <Logo />
            {params ? (
              <div>
                <Link
                  href={`/${params.username}`}
                  className="text-base font-medium leading-none text-muted-foreground hover:underline hover:text-blue-500"
                >
                  {params.username}
                </Link>
                {params.repository ? <span className="mx-2">/</span> : null}
                {params.repository ? (
                  <>
                    <Link
                      href={`/${params.username}/${params.repository}`}
                      className="text-base font-medium leading-none text-muted-foreground hover:underline hover:text-blue-500"
                    >
                      {params.repository}
                    </Link>
                  </>
                ) : null}
              </div>
            ) : null}

            {isAuthenticated ? null : <NavItems />}
          </div>
        </div>
        {isAuthenticated ? (
          <Rightside user={user as User} />
        ) : (
          <div className="flex items-center justify-center h-auto gap-3 mr-4">
            <Link href={"/auth/login"}>
              <Button variant={"ghost"}>Sign in</Button>
            </Link>
            <Link href={"/auth/signup"}>
              <Button variant={"outline"}>Sign up</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
