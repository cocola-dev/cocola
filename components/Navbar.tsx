"use client";

import React from "react";
import Logo from "./nav/Logo";
import Rightside from "./nav/rightside";
import { User } from "@prisma/client";
import Leftside from "./nav/leftside";
import NavItems from "./nav/navItems";
import Link from "next/link";
import { Button } from "./ui/button";
import { useParams, usePathname } from "next/navigation";
import { LoginButton } from "./auth/login-button";
import { useCurrentUser } from "@/hooks/use-current-user";

const Navbar = ({ isAuthenticated }: { isAuthenticated: any }) => {
  const user = useCurrentUser();
  const params = useParams();
  const pathname = usePathname();

  const itemByPath = [
    {
      pathname: "/",
      displyName: "Dashboard",
      href: "/",
    },
    {
      pathname: "/setting/*",
      displyName: "Setting",
      href: "/setting",
    },
    {
      pathname: "/pulls",
      displyName: "Pulls",
      href: "/pulls",
    },
  ];

  return (
    <>
      <div
        className={`${pathname === "/" && !user ? "hidden" : "flex"} z-50 ${pathname === "/" ? " sticky top-0 backdrop-blur-3xl border-b" : "bg-card"} items-center justify-between text-sm font-medium  h-14 bg-primary-foreground/35`}
        id="navbar"
      >
        <div>
          <div className="flex items-center ml-4">
            {isAuthenticated ? <Leftside /> : <div className="-mb-10" />}
            <Logo />

            <div className="hidden md:block">
              {params && isAuthenticated ? (
                <div>
                  {params.username ? (
                    <Link
                      href={`/${params.username}`}
                      className="text-base font-medium leading-none text-muted-foreground hover:underline hover:text-blue-500"
                    >
                      {params.username}
                    </Link>
                  ) : null}
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

              {itemByPath.map((items, index) =>
                pathname === items.pathname ? (
                  <Button
                    key={index}
                    variant={"ghost"}
                    size={"sm"}
                    className="text-center text-base mx-0 font-semibold"
                    asChild
                  >
                    <Link href={items.href}>{items.displyName}</Link>
                  </Button>
                ) : null,
              )}
            </div>
            <div className="hidden md:block">
              {isAuthenticated ? null : <NavItems />}
            </div>
          </div>
        </div>
        {isAuthenticated ? (
          <Rightside user={user as User} />
        ) : (
          <div className="flex items-center justify-center h-auto gap-3 mr-4">
            {pathname === "/login" || pathname === "/register" ? (
              <Link href={"/login"}>
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
