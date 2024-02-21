"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/userContext";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface AccountSwitcherProps {
  isCollapsed: boolean;
  accounts: {
    label: string;
    // label: string;
    icon: React.ReactNode;
  }[];
}

export default function Page() {
  const { user } = useAuth();

  const accounts = [
    {
      label: user?.username || "",
      icon: (
        <>
          <Image
            src={user?.image || "https://asset-cocola.vercel.app/ruru_m07.png"}
            className="rounded-full"
            alt="user"
            width={25}
            height={25}
          />
        </>
      ),
    },
  ];

  const repository = [
    {
      image: "https://asset-cocola.vercel.app/ruru_m07.png",
      auther: "ruru_m07",
      repository: "test",
    },
    {
      image: "https://asset-cocola.vercel.app/copilot.png",
      auther: "copilot",
      repository: "AI",
    },
    {
      image: "https://asset-cocola.vercel.app/ruru_m07.png",
      auther: "ruru-m07",
      repository: "test",
    },
    {
      image: "https://asset-cocola.vercel.app/black_logo_png.png",
      auther: "cocola-dev",
      repository: "cocola",
    },
  ];

  const [selectedAccount, setSelectedAccount] = React.useState<string>(
    accounts[0].label,
  );

  const isCollapsed = false;

  return (
    <main className="h-full w-full border-t flex justify-between">
      <ScrollArea className="w-[550px] border-r p-4 h-[93vh] sticky top-0">
        <div className="w-40">
          <Select
            defaultValue={selectedAccount}
            onValueChange={setSelectedAccount}
          >
            <SelectTrigger
              className={cn(
                "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
                isCollapsed &&
                  "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden",
              )}
              aria-label="Select account"
            >
              <SelectValue placeholder="Select an account">
                {
                  accounts.find((account) => account.label === selectedAccount)
                    ?.icon
                }
                <span className={cn("ml-2", isCollapsed && "hidden")}>
                  {
                    accounts.find(
                      (account) => account.label === selectedAccount,
                    )?.label
                  }
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.label} value={account.label}>
                  <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                    {account.icon}
                    {account.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Top Repositories */}

        <div className="w-full ">
          <div className="flex items-center my-3 justify-between">
            <h1 className="w-full text-lg">Top Repositories</h1>
            <Button size={"sm"}> New </Button>
          </div>
          <div>
            <Input placeholder="Find a repository" />
          </div>
          <div className="my-3 mt-5">
            {repository.map((repo, index) => (
              <div key={index} className="flex items-center my-2 ">
                <Avatar className="w-5 h-5">
                  <AvatarImage
                    src={repo.image}
                    alt="repository"
                    width={2}
                    height={2}
                  />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <span className="ml-2 text-sm">
                  <Link href={`/${repo.auther}`}>{repo.auther}</Link> /{" "}
                  <Link href={`/${repo.auther}/${repo.repository}`}>
                    {repo.repository}
                  </Link>
                </span>
              </div>
            ))}
            <Button
              className="m-0 p-0 hover:text-blue-700 text-muted-foreground"
              variant={"link"}
            >
              see more
            </Button>
          </div>
        </div>

        {/* Recent activity */}

        <div className="w-full ">
          <div className="flex items-center my-3 justify-between">
            <h1 className="w-full text-lg">Recent activity</h1>
          </div>
          <div className="my-3 mt-5">
            <h1 className="text-muted-foreground">
              don&apos;t have any recent activity
            </h1>
          </div>
        </div>
      </ScrollArea>
      <ScrollArea className="w-full border-r p-4 h-[93vh]">
        <h1 className="text-2xl">Home</h1>
      </ScrollArea>
      <ScrollArea className="w-[550px] border-r p-4 h-[93vh]"></ScrollArea>
    </main>
  );
}
