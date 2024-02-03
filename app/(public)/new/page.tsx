"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/userContext";
import { ChevronDownIcon, PlusIcon } from "lucide-react";
import React from "react";

const Page = () => {
  interface Credentials {
    name: string;
    description: string;
  }

  const { user } = useAuth();
  const [credentials, setCredentials] = React.useState<Credentials>({
    name: "",
    description: "",
  });

  const onChange = (e: { target: { name: string; value: string } }) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(credentials);
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="mt-10 sm:max-w-4xl">
        <div className="ml-2">
          <h1 className="text-3xl">Create a new repository</h1>
          <p className="mb-2 text-sm text-muted-foreground">
            A repository contains all project files, including the revision
            history. Already have a project repository elsewhere?
          </p>
          <hr className="border " />
        </div>
        <div className="grid items-center space-x-2">
          <p className="mt-3 ml-2 text-sm italic font-bold leading-none tracking-tight text-muted-foreground">
            Required fields are marked with an asterisk (*).
          </p>
          <div className="flex mt-4">
            <div className="mt-5">
              <h1>owner *</h1>
              <div className="flex items-center mt-2 space-x-1 rounded-md bg-secondary text-secondary-foreground">
                <Button variant="secondary" className="px-3 shadow-none">
                  {/* <StarIcon className="w-4 h-4 mr-2" /> */}@{user?.username}
                </Button>
                <Separator orientation="vertical" className="h-[20px]" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" className="px-2 shadow-none">
                      <ChevronDownIcon className="w-4 h-4 text-secondary-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    alignOffset={-5}
                    className="w-[200px]"
                    forceMount
                  >
                    <DropdownMenuLabel>Select owner</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      @{user?.username}
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <PlusIcon className="w-4 h-4 mr-2" /> Add User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="mt-6 ml-2">
              <h1> ‎ ‎ </h1>
              <div className="flex items-center mt-1 space-x-1 rounded-md text-secondary-foreground">
                <h1 className="text-2xl "> / </h1>
              </div>
            </div>
            <div className="mt-5 ml-2">
              <h1>Repository name *</h1>
              <div className="flex items-center mt-2 space-x-1 rounded-md bg-secondary text-secondary-foreground">
                <Input
                  className=" w-96"
                  placeholder="Repository name *"
                  autoFocus
                  name="name"
                  onChange={onChange}
                  id="name"
                  minLength={5}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs leading-none tracking-tight text-muted-foreground">
            Great repository names are short and memorable. Need inspiration?
            How about
            <label className="text-black dark:text-white"> Lorem-ipsum </label>?
          </p>
          <div className="mt-5 ml-2">
            <div className="flex">
              <h1>branch name </h1>
              <p className="ml-1 text-muted-foreground"> (optional) </p>
            </div>
            <p className="mt-1 mb-2 text-sm text-muted-foreground">
              default branch name will be main.
            </p>
            <div className="flex items-center mt-2 space-x-1 rounded-md w-96 bg-secondary text-secondary-foreground">
              <Input
                className=" w-96"
                placeholder="main"
                name="branchename"
                onChange={onChange}
                id="branchename"
                minLength={3}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="mt-6">
            <div className="flex">
              <h1>Description </h1>

              <p className="ml-1 text-muted-foreground"> (optional) </p>
            </div>
            <Textarea
              className=" my-4 mb-7 bg-[#262626]"
              placeholder="Type your Description here."
              name="description"
              onChange={onChange}
              id="description"
            />
          </div>
        </div>
        <div className="flex items-center justify-between w-full ">
          <div />
          <Button onClick={handleSubmit} className="ml-2">
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
