"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookMarked,
  CircleDot,
  GitPullRequestArrowIcon,
  GraduationCap,
  ListFilter,
  Lock,
  TrendingUp,
  Wrench,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ArrowRightIcon,
  BellIcon,
  CheckIcon,
  CodeIcon,
  SlashIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { ReandomRepos } from "@/actions/repo/rendomRepo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Label } from "@/components/ui/label";
import Footer from "@/components/footer";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RepoSchema } from "@/schemas";
import { Repository } from "@prisma/client";
import { ASSETS } from "@/data/variables";
import { Separator } from "@/components/ui/separator";
import ContentLoader from "@/components/ContentLoader";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const Dashboard = () => {
  const form = useForm<z.infer<typeof RepoSchema>>({
    resolver: zodResolver(RepoSchema),
    defaultValues: {
      name: "",
      description: "",
      visibility: "public",
      branch: "main",
    },
  });

  // ! hooks.
  const user = useCurrentUser();
  const isCollapsed = false;

  // todo: dataset
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
  const [repositoryloading, setRepositoryloading] = React.useState(true);
  const [rendomRepositreys, setRendomRepositreys] = React.useState<
    Repository[] | []
  >([]);

  const getReandomRepo = async () => {
    setRepositoryloading(true);
    await ReandomRepos(3)
      .then((data) => {
        if (data.data) {
          setRendomRepositreys(data.data);
        }
      })
      .finally(() => setRepositoryloading(false));
  };

  React.useEffect(() => {
    getReandomRepo();
  }, []);

  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

  const notifications = [
    {
      title: "Your call has been confirmed.",
      description: "1 hour ago",
    },
    {
      title: "You have a new message!",
      description: "1 hour ago",
    },
    {
      title: "Your subscription is expiring soon!",
      description: "2 hours ago",
    },
  ];

  return (
    <>
      <main className="h-full w-full border-t flex justify-between">
        <ScrollArea className="w-1/5 border-r p-4 h-[93vh] bg-primary-foreground/35 sticky top-0">
          <div className="w-40">
            <Select
              defaultValue={selectedAccount}
              onValueChange={setSelectedAccount}
            >
              <SelectTrigger
                className={cn(
                  "flex items-center gap-2 m-px [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
                  isCollapsed &&
                    "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden",
                )}
                aria-label="Select account"
              >
                <SelectValue placeholder="Select an account">
                  {
                    accounts.find(
                      (account) => account.label === selectedAccount,
                    )?.icon
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
                {accounts ? (
                  accounts.map((account) => (
                    <SelectItem key={account.label} value={account.label}>
                      <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                        {account.icon}
                        {account.label}
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value={"add"}>
                    <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                      add account
                    </div>
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          {/* Top Repositories */}

          <div className="w-full ">
            <div className="flex items-center my-3 justify-between">
              <h1 className="w-full text-lg">Top Repositories</h1>
              <Link href={"/new"} className="m-px">
                <Button size={"sm"}>New</Button>
              </Link>
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
            <div className="flex items-center justify-between">
              <h1 className="w-full text-lg">Recent activity</h1>
            </div>
            <div className="mt-2 text-sm">
              <h1 className="text-muted-foreground">
                don&apos;t have any recent activity
              </h1>
            </div>
          </div>
        </ScrollArea>
        <ScrollArea className=" w-[55%] border-r p-4 h-[93vh]">
          <header className="flex justify-between items-center ">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Home
            </h3>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="gap-2 flex items-center m-1"
                  >
                    <ListFilter size={18} /> Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={showStatusBar}
                    onCheckedChange={setShowStatusBar}
                  >
                    Status Bar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showActivityBar}
                    onCheckedChange={setShowActivityBar}
                    disabled
                  >
                    Activity Bar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showPanel}
                    onCheckedChange={setShowPanel}
                  >
                    Panel
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <div>
            {/* // TODO: create repo card and notification card... */}
            <section className="my-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="border rounded-full bg-primary-foreground/35 w-fit p-2">
                    <CodeIcon className="h-5 w-5" />
                  </div>
                  <p className="text-sm ml-2 text-muted-foreground">
                    Start writing code.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-4">
                <Card className="w-1/2 rounded-md bg-primary-foreground/35">
                  <CardHeader>
                    <CardTitle>
                      Start a new repository for {user?.username}
                    </CardTitle>
                    <CardDescription>
                      A repository contains all of your project&apos;s files,
                      revision history, and collaborator discussion.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form>
                        <div className="grid w-full items-center gap-4">
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Repository name *</Label>
                            <div className="flex items-center mt-2 space-x-1 rounded-md bg-secondary text-secondary-foreground">
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem className="w-full ">
                                    <FormControl>
                                      <Input
                                        className="w-full bg-card"
                                        placeholder="Name of your project *"
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
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Visibility</Label>
                            <RadioGroup
                              defaultValue={"public"}
                              className="flex flex-col "
                            >
                              <FormItem className="flex items-center -mb-6 space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="public" />
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
                                  <RadioGroupItem value="private" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  <div className="flex items-center my-3">
                                    <div>
                                      <Lock />
                                    </div>
                                    <div className="items-center ml-3">
                                      <h1 className="text-base">private</h1>
                                      <p className="text-xs text-muted-foreground ">
                                        You choose who can see and commit to
                                        this repository.
                                      </p>
                                    </div>
                                  </div>
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </div>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Create</Button>
                  </CardFooter>
                </Card>
                <Card className="w-1/2 rounded-md bg-primary-foreground/35">
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      You have 3 unread messages.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className=" flex items-center space-x-4 rounded-md border p-4">
                      <BellIcon />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Push Notifications
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Send notifications to device.
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div>
                      {notifications.map((notification, index) => (
                        <div
                          key={index}
                          className="mb-4 mx-2 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                        >
                          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-card-foreground" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {notification.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {notification.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <CheckIcon className="mr-2 h-4 w-4" /> Mark all as read
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </section>

            {/* // TODO: Use tools of the trade */}
            <section className="my-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="border rounded-full bg-primary-foreground/35 w-fit p-2">
                    <Wrench className="h-5 w-5" />
                  </div>
                  <p className="text-sm ml-2 text-muted-foreground">
                    Use tools of the trade
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-4">
                <Card className="w-1/2 rounded-md bg-primary-foreground/35">
                  <CardHeader>
                    <CardTitle>Create issues and pull requests.</CardTitle>
                    <div className="flex items-center justify-center">
                      <CircleDot size={34} className="mr-4 flex " />
                      <CardDescription>
                        make issues and pull requests to keep your project
                        organized.{" "}
                        <Label className="hover:underline hover:text-blue-500">
                          Learn more
                        </Label>
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
                <Card className="w-1/2 rounded-md bg-primary-foreground/35">
                  <CardHeader>
                    <CardTitle>Manage projects with open source.</CardTitle>
                    <div className="flex items-center justify-center">
                      <GitPullRequestArrowIcon
                        size={34}
                        className="mr-4 flex "
                      />
                      <CardDescription>
                        Manage your open source projects like a pro with Cocola.
                        <Label className="hover:underline ml-1 hover:text-blue-500">
                          Learn more
                        </Label>
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </section>

            {/* // Todo: Get started on GitHub */}
            <section className="my-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="border rounded-full bg-primary-foreground/35 w-fit p-2">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <p className="text-sm ml-2 text-muted-foreground">
                    Get started on GitHub
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-4">
                <Card className="w-1/2 rounded-md bg-primary-foreground/35">
                  <CardHeader>
                    <TrendingUp size={26} className="mr-4 flex " />
                    <div className="">
                      <CardTitle>
                        Follow this exercise to try the Cocola flow.
                      </CardTitle>
                      <CardDescription className="mt-2">
                        Cocola&apos;s “Hello World” tutorial teaches you
                        essentials, where you create your own repository and
                        learn Cocola&apos;s pull request workflow for creating
                        and reviewing code.
                        <Label className="hover:underline ml-1 hover:text-blue-500">
                          Learn more
                        </Label>
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </section>
          </div>
        </ScrollArea>
        <ScrollArea className="w-1/4 border-r p-4 h-[93vh]">
          <Card className="w-full rounded-md bg-primary-foreground/35">
            <CardHeader>
              <div className="">
                <CardTitle>Explore repositories.</CardTitle>
                {repositoryloading ? (
                  <div className="flex justify-center items-center pt-2 mt-2">
                    <ContentLoader />
                  </div>
                ) : (
                  <CardDescription className="mt-4  ">
                    {rendomRepositreys.map((items, index) => (
                      <div className="my-2" key={index}>
                        <header className="flex items-center justify-between">
                          <section className="flex items-center">
                            <Avatar className="h-5 w-5 mr-2">
                              <AvatarImage
                                src={`${ASSETS}/${items.author}.png`}
                                alt={`@${items.author}`}
                              />
                              <AvatarFallback></AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex text-secondary-foreground justify-center items-center gap-3">
                                <div>
                                  <Link href={`/${items.author}`}>
                                    {items.author}
                                  </Link>
                                </div>
                                <div className="-mx-2">
                                  <SlashIcon />
                                </div>
                                <div>
                                  <Link
                                    href={`/${items.author}/${items.name}`}
                                  >
                                    {items.name}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </section>
                          <div className="ml-auto">
                            <Button
                              variant="outline"
                              className="h-6 w-6 rounded-sm"
                              size="icon"
                            >
                              <StarIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </header>
                        <div className="my-2">
                          <p className="text-xs text-muted-foreground">
                            {items.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <StarIcon className="h-4 w-4" /> {items.stars}
                        </div>
                        {index !== rendomRepositreys.length - 1 && (
                          <Separator className="my-4" />
                        )}
                      </div>
                    ))}
                    <Label className=" hover:underline flex items-center hover:text-blue-600 text-sm mt-2">
                      Explore more <ArrowRightIcon className="mt-1 ml-1" />
                    </Label>
                  </CardDescription>
                )}
              </div>
            </CardHeader>
          </Card>
        </ScrollArea>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Dashboard;
