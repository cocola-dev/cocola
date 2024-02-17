"use client";

import React from "react";
import Logo from "./nav/Logo";
import { useAuth } from "@/context/userContext";
import Rightside from "./nav/rightside";
import { User } from "@prisma/client";
import Leftside from "./nav/leftside";
import NavItems from "./nav/navItems";
import Link from "next/link";
import { Button } from "./ui/button";
import { useParams, usePathname } from "next/navigation";
import { LoginButton } from "./auth/login-button";

const Navbar = ({ isAuthenticated }: { isAuthenticated: any }) => {
  const { user } = useAuth();
  const params = useParams();
  const pathname = usePathname();

  return (
    <>
      <div className="sticky z-50 inline-flex items-center justify-between w-full text-sm font-medium top-0 bg-card h-14">
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
            {pathname === "/login" || pathname === "/register" ? (
              <Link href={'/login'}>
                <Button variant={"ghost"}>Sign in</Button>
              </Link>
            ) : (
              <LoginButton asChild mode={"modal"}>
                <Button variant={"ghost"}>Sign in</Button>
              </LoginButton>
            )}
            <Link href={"/register"}>
              <Button variant={"outline"}>Sign up</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
