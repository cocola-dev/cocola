"use client";

import React from "react";
import { useTheme } from "next-themes";
import Logo from "./nav/Logo";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Monitor } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex justify-center w-full border-t rounded-none">
      <div className="w-full mx-60">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Logo />
            <h1 className="text-muted-foreground">© 2024</h1>
            <Button variant={"ghost"} className="mx-3 ">
              <div className="text-[#0070f3] flex justify-center items-center">
                <div className="bg-[#0070f3] w-3 h-3 rounded-full mr-2" />
                All systems normal.
              </div>
            </Button>
          </div>
          <div className="flex items-center gap-1 justify-normal">
            <Button
              className={`p-0 h-8 w-8 rounded-full ${
                theme === "dark"
                  ? "bg-accent"
                  : "dark:hover:text-white text-muted-foreground hover:bg-transparent"
              }`}
              variant={"ghost"}
              onClick={() => {
                setTheme("dark");
              }}
            >
              <MoonIcon />
            </Button>
            <Button
              className={`p-0 h-8 w-8 rounded-full ${
                theme === "light"
                  ? "bg-accent"
                  : "dark:hover:text-white text-muted-foreground hover:bg-transparent"
              }`}
              variant={"ghost"}
              onClick={() => {
                setTheme("light");
              }}
            >
              <SunIcon />
            </Button>
            <Button
              className={`p-0 h-8 w-8 rounded-full ${
                theme === "system"
                  ? "bg-accent"
                  : "dark:hover:text-white text-muted-foreground hover:bg-transparent"
              }`}
              variant={"ghost"}
              onClick={() => {
                setTheme("system");
              }}
            >
              <Monitor size={16} strokeWidth={1.25} />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between mb-7">
          <Button
            className="text-muted-foreground dark:hover:text-white"
            variant={"link"}
          >
            <Link href={"/"}>Home</Link>
          </Button>
          <Button
            className="text-muted-foreground dark:hover:text-white"
            variant={"link"}
          >
            <Link href={"/"}>Documentation</Link>
          </Button>
          <Button
            className="text-muted-foreground dark:hover:text-white"
            variant={"link"}
          >
            <Link href={"/"}>Guides</Link>
          </Button>
          <Button
            className="text-muted-foreground dark:hover:text-white"
            variant={"link"}
          >
            <Link href={"/"}>Help</Link>
          </Button>
          <Button
            className="text-muted-foreground dark:hover:text-white"
            variant={"link"}
          >
            <Link href={"/"}>Contact Sales</Link>
          </Button>
          <Button
            className="text-muted-foreground dark:hover:text-white"
            variant={"link"}
          >
            <Link href={"/"}>Blog</Link>
          </Button>
          <Button
            className="text-muted-foreground dark:hover:text-white"
            variant={"link"}
          >
            <Link href={"/"}>Changelog</Link>
          </Button>
          <Button
            className="text-muted-foreground dark:hover:text-white"
            variant={"link"}
          >
            <Link href={"/"}>Pricing</Link>
          </Button>
          <Button
            className="text-muted-foreground dark:hover:text-white"
            variant={"link"}
          >
            <Link href={"/"}>Enterprise</Link>
          </Button>
          <Button
            className="text-muted-foreground dark:hover:text-white"
            variant={"link"}
          >
            <Link href={"/"}>Legal</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
