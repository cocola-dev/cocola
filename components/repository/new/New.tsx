"use client";

import { create } from "@/actions/repo/create";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { RepoSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import {
  BookMarked,
  ChevronDownIcon,
  Info,
  Lock,
  PlusIcon,
} from "lucide-react";
import React, { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Heder from "./Heder";
import Alert from "@/components/alert/Alert";
import { useCurrentUser } from "@/hooks/use-current-user";

const New = () => {
  const router = useRouter();
  const [alertmsg, setAlertmsg] = useState<string>(
    "You are creating a public repository in your personal account.",
  );
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState(false);
  const user = useCurrentUser();

  const form = useForm<z.infer<typeof RepoSchema>>({
    resolver: zodResolver(RepoSchema),
    defaultValues: {
      name: "",
      description: "",
      visibility: "public",
      branch: "main",
    },
  });

  function onSubmit(values: z.infer<typeof RepoSchema>) {
    setIsPending(true);
    setError("");
    setSuccess("");

    startTransition(() => {
      setIsPending(true);

      create(values, user as User).then((data: any) => {
        if (data?.error) {
          form.reset();
          setError(data.error);
        }

        if (data?.success) {
          form.reset();
          setSuccess(data.success);
          router.push(`/${user?.username}/${values.name}`, { scroll: false });
        }
        setIsPending(false);
      });
    });
    setIsPending(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        <div className="mt-10 mb-10 sm:max-w-7xl">
          <Heder />
          <div className="grid items-center space-x-2">
            <p className="mt-2 ml-2 text-sm italic font-bold leading-none tracking-tight text-muted-foreground">
              Required fields are marked with an asterisk (*).
            </p>
            <div className="flex -mt-2">
              <div className="mt-5">
                <h1>owner *</h1>
                <div className="flex items-center mt-2 space-x-1 border rounded-md bg-card text-secondary-foreground">
                  <div className="px-3 w-[150px] shadow-none">
                    @{user?.username}
                  </div>
                  <Separator orientation="vertical" className="h-[20px]" />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="px-2 shadow-none">
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
              <div className="w-full mt-5 ml-2">
                <h1>Repository name *</h1>
                <div className="flex items-center mt-2 space-x-1 rounded-md bg-secondary text-secondary-foreground">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full bg-card">
                        <FormControl>
                          <Input
                            className="w-full"
                            placeholder="Repository name *"
                            autoFocus
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs leading-none tracking-tight text-muted-foreground">
              Great repository names are short and memorable. Need inspiration?
              How about
              <label className="text-black dark:text-white">
                {" "}
                Lorem-ipsum{" "}
              </label>
              ?
            </p>
            {/* description */}
            <div className="mt-6">
              <div className="flex">
                <h1>Description </h1>

                <p className="ml-1 text-muted-foreground"> (optional) </p>
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="bg-card">
                    <FormControl>
                      <Textarea
                        className="my-4 "
                        placeholder="Type your Description here."
                        id="description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-2" />

            {/* branch  */}
            <div className="my-2 ml-2">
              <div className="flex">
                <h1>Branch name </h1>
                <p className="ml-1 text-muted-foreground"> (optional) </p>
              </div>
              <p className="mt-1 mb-2 text-xs text-muted-foreground">
                default branch name should be &quot;main&quot;.
              </p>
              <div className="flex items-center mt-2 space-x-1 rounded-md w-fit bg-secondary text-secondary-foreground">
                <FormField
                  control={form.control}
                  name="branch"
                  render={({ field }) => (
                    <FormItem className="bg-card">
                      <FormControl>
                        <Input
                          placeholder="main"
                          id="branchename"
                          minLength={3}
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator className="my-2" />
            <div>
              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col "
                      >
                        <FormItem className="flex items-center -mb-6 space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="public"
                              onClick={() =>
                                setAlertmsg(
                                  "You are creating a public repository in your personal account.",
                                )
                              }
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <div className="flex items-center my-3">
                              <div>
                                <BookMarked />
                              </div>
                              <div className="items-center ml-3">
                                <h1 className="text-base">public</h1>
                                <p className="text-xs text-muted-foreground ">
                                  Anyone on the internet can see this
                                  repository. You choose who can commit.
                                </p>
                              </div>
                            </div>
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="private"
                              onClick={() =>
                                setAlertmsg(
                                  "You are creating a private repository in your personal account.",
                                )
                              }
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <div className="flex items-center my-3">
                              <div>
                                <Lock />
                              </div>
                              <div className="items-center ml-3">
                                <h1 className="text-base">private</h1>
                                <p className="text-xs text-muted-foreground ">
                                  You choose who can see and commit to this
                                  repository.
                                </p>
                              </div>
                            </div>
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            {/* <Separator className="my-2 border" /> */}
            <div className="items-center text-muted-foreground">
              {alertmsg ? (
                <Alert message={alertmsg} variant={"denger"} />
              ) : null}
            </div>
            {/* <Separator className="my-3 border" /> */}
          </div>
          <div className="my-4">
            {error ? <Alert message={error} variant={"alert"} /> : null}
            {success ? <Alert message={success} variant={"success"} /> : null}
          </div>
          <div className="flex items-center justify-between w-full ">
            <div />

            <Button type="submit" disabled={isPending} className="ml-2 ">
              Create
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default New;
