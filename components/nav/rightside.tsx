import {
  BookMarked,
  ChevronDownIcon,
  CircleDot,
  GitPullRequestArrow,
  Inbox,
  LogOut,
  Plus,
  Search,
  Settings,
  UserIcon,
  UserPlus,
} from "lucide-react";
import React from "react";
import { CommandDialogDemo } from "../CommandDialogDemo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { TooltipProvider } from "../ui/tooltip";
import { Separator } from "../ui/separator";
import { User } from "@prisma/client";
import { ASSET_BASE_URL } from "@/resources";
import { LogoutButton } from "../auth/logout-button";

const Rightside = ({ user }: { user: User | null }) => {
  return (
    <div className="flex items-center justify-center h-auto">
      <div className="hidden md:flex  md:mr-0 mr-3 items-center justify-center p-2 ml-2 border rounded-lg hover:bg-accent hover:text-accent-foreground">
        <div className="mr-2 text-muted-foreground">
          <Search size={16} />
        </div>
        <label className="mr-2 text-xs text-muted-foreground">
          Search Anything...
        </label>
        <label className="flex px-1 border rounded-sm bg-accent">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center rounded border bg-muted font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <CommandDialogDemo />
          </kbd>
        </label>
      </div>
      <div className="hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="px-2 ml-2 border text-muted-foreground hover:bg-secondary"
              variant="link"
            >
              <Plus size={20} />
              <ChevronDownIcon size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Create...</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={"/new"}>
                <DropdownMenuItem>
                  <BookMarked size={16} className="mr-2" />
                  New repository
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href={"/issues"}>
          <Button
            className="px-2 ml-2 border text-muted-foreground hover:bg-secondary"
            variant="link"
          >
            <CircleDot size={20} />
          </Button>
        </Link>
        <Link href={"/pulls"}>
          <Button
            className="px-2 ml-2 border text-muted-foreground hover:bg-secondary"
            variant="link"
          >
            <GitPullRequestArrow size={20} />
          </Button>
        </Link>
        <Link href={"/notifications"}>
          <Button
            className="px-2 mx-2 border text-muted-foreground hover:bg-secondary relative"
            variant="link"
          >
            <Inbox size={20} />
            <div className="w-2 h-2 bg-[#0070f3] rounded-full absolute bottom-1 right-1"></div>
          </Button>
        </Link>
      </div>
      {/* <div className="mr-4 text-muted-foreground"> | </div> */}
      <div className="flex items-center justify-center h-auto">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger>
              <Avatar className="w-8 h-8 mr-5">
                <AvatarImage src={user?.image} alt={`"@${user?.username}"`} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </SheetTrigger>
            <SheetContent className="w-[300px] " side={"right"}>
              <TooltipProvider delayDuration={0}>
                <div className="-mt-4">
                  <div className="flex items-center">
                    <Avatar className="w-8 h-8 mr-5">
                      <AvatarImage
                        src={user?.image}
                        alt={`"@${user?.username}"`}
                      />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-lg">{user?.username}</div>
                    </div>
                  </div>
                  <div className="flex justify-center w-full my-3">
                    <div className="w-full">
                      <Separator className="w-full my-2" />

                      <SheetClose asChild>
                        <Link
                          className="flex w-full p-2 my-1 text-xs rounded-md hover:bg-secondary"
                          href={`/${user?.username}`}
                        >
                          <UserIcon size={16} />
                          <p className="ml-2">Your profile</p>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          className="flex w-full p-2 my-1 text-xs rounded-md hover:bg-secondary"
                          href={`/${user?.username}`}
                        >
                          <UserPlus size={16} />
                          <p className="ml-2">Add account</p>
                        </Link>
                      </SheetClose>

                      <Separator className="w-full my-2" />

                      <SheetClose asChild>
                        <Link
                          className="flex w-full p-2 my-1 text-xs rounded-md hover:bg-secondary"
                          href={`/repositories`}
                        >
                          <BookMarked size={16} />
                          <p className="ml-2">Add repositories</p>
                        </Link>
                      </SheetClose>

                      <Separator className="w-full my-2" />

                      <SheetClose asChild>
                        <Link
                          className="flex w-full p-2 my-1 text-xs rounded-md hover:bg-secondary"
                          href={`/settings`}
                        >
                          <Settings size={16} />
                          <p className="ml-2">Settings</p>
                        </Link>
                      </SheetClose>

                      <Separator className="w-full my-2" />

                      <LogoutButton>
                        <div className="flex w-full p-2 my-1 text-xs rounded-md hover:bg-secondary">
                          <LogOut className="mr-2" size={16} />
                          <LogoutButton>logout</LogoutButton>
                        </div>
                      </LogoutButton>
                    </div>
                  </div>
                </div>
              </TooltipProvider>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Rightside;
