/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { getIssueByNumber } from "@/actions/repo/getIssueByNumber";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/hooks/use-current-user";
import { IssuePullRequest } from "@prisma/client";
import { CircleDot, Loader2, Smile } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MarkdownReader from "@/components/mdx-components";
import { ASSETS } from "@/data/variables";
import * as timeago from "timeago.js";
import {
  ArrowRightIcon,
  ChatBubbleIcon,
  DrawingPinIcon,
  GearIcon,
  InfoCircledIcon,
  LockClosedIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Write } from "@/components/ui/fancy-area/write";

const Page = ({
  params,
}: {
  params: { username: string; repository: string; issueNum: number };
}) => {
  // * hooks
  const user = useCurrentUser();

  // * states
  const [issue, setIssue] = React.useState<IssuePullRequest | null>(null);
  const [isLoadin, setIsLoadin] = React.useState(true);
  const [textValue, setTextValue] = React.useState("");

  // * 📐 functions
  const FetchIssue = async () => {
    setIsLoadin(true);
    const repositoryPath = `${params.username}/${params.repository}`;

    await getIssueByNumber(params?.issueNum, repositoryPath)
      .then((res) => {
        if (res.success) {
          setIssue(res.success);
        }
      })
      .finally(() => setIsLoadin(false));
  };

  // * 🚀 useEffect
  React.useEffect(() => {
    FetchIssue();
  }, []);

  return (
    <div>
      {isLoadin ? (
        <Loader2 className="animate-spin w-full mt-20" />
      ) : (
        <>
          {/* // ! issue info section */}
          <div className="w-[80%] m-auto flex mt-7">
            <div className="w-full flex justify-between">
              <div>
                <div className="text-3xl flex">
                  {issue?.title}{" "}
                  <p className="text-muted-foreground ml-3">#{issue?.number}</p>
                </div>
                <div className="text-muted-foreground flex items-center  text-sm mt-3">
                  {issue?.isOpen ? (
                    <div className="bg-[#238636] text-foreground rounded-full w-fit flex items-center justify-center h-8 px-3 mr-3">
                      <CircleDot className="mr-1" size={16} /> Open{" "}
                    </div>
                  ) : null}
                  <Link
                    className="hover:underline hover:text-blue-500"
                    href={`/${issue?.author}`}
                  >
                    {issue?.author}
                  </Link>
                  <Label className="mx-1"> opened this issue </Label>
                  {issue ? timeago.format(issue?.createdAt, "en_US") : null}
                  {" • "} {issue?.commentscount} {" comments "}
                </div>
              </div>
              <div>
                <Button
                  disabled
                  size={"sm"}
                  variant={"outline"}
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button size={"sm"} asChild>
                  <Link
                    href={`/${params.username}/${params.repository}/issues/new`}
                  >
                    New issue
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* // ! section after issue info section */}
          <div className="w-[80%] m-auto">
            <Separator className="my-5" />
            <section className="flex w-full gap-4 py-5">
              {/* // ! left side section */}
              <div className="grid">
                {/* // * massage body */}
                <Card className="flex  mb-7 w-full border-none rounded-md">
                  <div>
                    <Avatar asChild>
                      <Link href={`/${issue?.author}`}>
                        <AvatarImage
                          src={`${ASSETS}/${issue?.author}.png`}
                          alt={user?.username || "profile"}
                        />
                        <AvatarFallback> </AvatarFallback>
                      </Link>
                    </Avatar>
                  </div>
                  <div
                    className={` relative w-full ml-4 comment-triangle ${issue?.author === user?.username ? "comment-triangle-author" : ""}`}
                  >
                    <Card
                      className={`w-full overflow-hidden  rounded-md ${issue?.author === user?.username ? "border-[#404040]" : ""} `}
                    >
                      <div
                        className={`border-b p-3 bg-primary-foreground   ${issue?.author === user?.username ? "border-[#404040]" : ""}`}
                      >
                        <p className="text-muted-foreground text-sm">
                          {issue?.author} commented{" "}
                          {issue
                            ? timeago.format(issue?.createdAt, "en_US")
                            : null}
                        </p>
                      </div>
                      <div className=" px-4 pt-4">
                        <MarkdownReader markdown={issue?.body} />
                      </div>
                      <div className="px-4 mt-6 mb-2 ">
                        <Button
                          variant={"ghost"}
                          className="rounded-full m-0 px-2"
                        >
                          <Smile size={20} className="text-muted-foreground" />
                        </Button>
                      </div>
                    </Card>
                    <div className="absolute bg-border left-10 w-px h-full"></div>
                  </div>
                </Card>

                {/* all comments are map here. */}
                {/* // ? <><><><><><><><><>  map start from bottom <><><><><><><><><> */}

                <Card className="flex mb-7 w-full border-none rounded-md">
                  <div>
                    <Avatar asChild>
                      <Link href={`/${issue?.author}`}>
                        <AvatarImage
                          src={`${ASSETS}/copilot.png`}
                          alt={user?.username || "profile"}
                        />
                        <AvatarFallback> </AvatarFallback>
                      </Link>
                    </Avatar>
                  </div>
                  <div
                    className={` relative w-full ml-4 comment-triangle ${issue?.author === "rutvik" ? "comment-triangle-author" : ""}`}
                  >
                    <Card
                      className={`w-full overflow-hidden  rounded-md ${issue?.author === "rutvik" ? "border-[#404040]" : ""} `}
                    >
                      <div
                        className={`border-b p-3 bg-primary-foreground   ${issue?.author === "rutvik" ? "border-[#404040]" : ""}`}
                      >
                        <p className="text-muted-foreground text-sm">
                          rutvik commented{" "}
                          {issue
                            ? timeago.format(issue?.createdAt, "en_US")
                            : null}
                        </p>
                      </div>
                      <div className=" px-4 pt-2">
                        <MarkdownReader markdown={"### hello ruru_m07"} />
                      </div>
                      <div className="px-4 mt-6 mb-2 ">
                        <Button
                          variant={"ghost"}
                          className="rounded-full m-0 px-2"
                        >
                          <Smile size={20} className="text-muted-foreground" />
                        </Button>
                      </div>
                    </Card>
                    <div className="absolute bg-border left-10 w-px h-full -z-10"></div>
                  </div>
                </Card>

                {/* // ? <><><><><><><><><>  map end in top <><><><><><><><><> */}

                {/* // ! Add a comment section */}
                <Separator />
                <Card className="grid mb-7 border-none py-4 overflow-hidden w-full rounded-md">
                  <div className="flex">
                    <div>
                      <Avatar asChild>
                        <Link href={`/${issue?.author}`}>
                          <AvatarImage
                            src={`${ASSETS}/${issue?.author}.png`}
                            alt={user?.username || "profile"}
                          />
                          <AvatarFallback> </AvatarFallback>
                        </Link>
                      </Avatar>
                    </div>
                    <div
                      className={`w-full ml-4 comment-triangle ${issue?.author === user?.username ? "comment-triangle-author" : ""}`}
                    >
                      <Card
                        className={`w-full overflow-hidden h-full rounded-md ${issue?.author === user?.username ? "border-[#404040]" : ""} `}
                      >
                        <div
                          className={`border-b p-3 bg-primary-foreground   ${issue?.author === user?.username ? "border-[#404040]" : ""}`}
                        >
                          <h4 className="scroll-m-20 font-semibold tracking-tight">
                            Add a comment
                          </h4>
                        </div>
                        <div className="mt-2 py-4 px-4 ">
                          <div data-color-mode="dark">
                            <Tabs
                              defaultValue="write"
                              className="relative mr-auto w-full"
                            >
                              <TabsList className="w-full justify-start rounded-none  bg-transparent p-0">
                                <TabsTrigger
                                  value="write"
                                  // disabled={isLoading}
                                  className="relative border border-r-0  rounded-none rounded-t-md border-b-transparent  px-4 pb-3 mb-1 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-0 data-[state=active]:bg-transparent bg-primary-foreground data-[state=active]:border-muted data-[state=active]:text-foreground data-[state=active]:shadow-none "
                                >
                                  Write
                                </TabsTrigger>
                                <TabsTrigger
                                  value="preview"
                                  // disabled={isLoading}
                                  className="relative border rounded-none rounded-t-md border-b-transparent  px-4 pb-3 mb-1 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-0 data-[state=active]:bg-transparent bg-primary-foreground data-[state=active]:border-muted data-[state=active]:text-foreground data-[state=active]:shadow-none "
                                >
                                  Preview
                                </TabsTrigger>
                              </TabsList>
                              <TabsContent className="p-0" value="write">
                                <Write {...{ textValue, setTextValue }} />
                              </TabsContent>
                              <TabsContent value="preview">
                                {/* <Card className="rounded-md max-w-[800px] border-none m-auto p-4 pb-10"> */}
                                <Card className="rounded-md border-none m-auto p-4 pb-10">
                                  <MarkdownReader markdown={textValue} />
                                </Card>
                              </TabsContent>
                            </Tabs>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                  <div className="flex items-center justify-end mt-2">
                    <Button>Comment</Button>
                  </div>
                </Card>
              </div>

              {/* // todo: right side section */}
              <Card className="w-96 border-none p-4">
                {/* Assignees */}
                <div>
                  <div className="flex justify-between items-center text-sm ">
                    <Label>Assignees</Label>
                    <GearIcon />
                  </div>
                  <div className="text-sm py-2">
                    {issue?.assignees && issue?.assignees.length > 0
                      ? issue?.assignees.map((assignee) => (
                          <div
                            key={assignee}
                            className="flex mt-2 items-center"
                          >
                            <Avatar className="h-5 w-5" asChild>
                              <Link href={`/${assignee}`}>
                                <AvatarImage
                                  src={`${ASSETS}/${assignee}.png`}
                                  alt={assignee}
                                />
                                <AvatarFallback> </AvatarFallback>
                              </Link>
                            </Avatar>
                            <Link href={`/${assignee}`}>
                              <p className="text-sm ml-1 hover:underline hover:text-blue-500">
                                {assignee}
                              </p>
                            </Link>
                          </div>
                        ))
                      : "No one assigned"}
                    <Separator className="my-4" />
                  </div>
                </div>

                {/* Labels */}
                <div>
                  <div className="flex justify-between items-center text-sm ">
                    <Label>Labels</Label>
                    <GearIcon />
                  </div>
                  <div className="text-sm py-2">
                    {issue?.labels && issue?.labels.length > 0
                      ? issue?.labels.map((label) => (
                          <div key={label} className="flex mt-2 items-center">
                            <Label className="mr-2">{label}</Label>
                          </div>
                        ))
                      : "None yet"}
                    <Separator className="my-4" />
                  </div>
                </div>

                {/* acrions */}
                <div className="grid place-items-start gap-y-2">
                  <Button
                    variant={"link"}
                    className=" h-auto w-auto p-0 text-sm m-0 ml-2"
                  >
                    <LockClosedIcon />
                    <p className="ml-2">Lock conversation</p>
                  </Button>
                  <Button
                    variant={"link"}
                    className=" h-auto w-auto p-0 text-sm m-0 ml-2"
                  >
                    <DrawingPinIcon />
                    <p className="ml-2 flex items-center gap-1">
                      Pin issue <InfoCircledIcon />
                    </p>
                  </Button>
                  <Button
                    variant={"link"}
                    className=" h-auto w-auto p-0 text-sm m-0 ml-2"
                  >
                    <ArrowRightIcon />
                    <p className="ml-2 flex items-center gap-1">
                      Transfer issue
                    </p>
                  </Button>
                  <Button
                    variant={"link"}
                    className=" h-auto w-auto p-0 text-sm m-0 ml-2"
                  >
                    <ChatBubbleIcon />
                    <p className="ml-2 flex items-center gap-1">
                      convert to conversion
                    </p>
                  </Button>
                  <Button
                    variant={"link"}
                    className=" h-auto w-auto p-0 text-sm m-0 ml-2"
                  >
                    <TrashIcon />
                    <p className="ml-2 flex items-center gap-1">Delete issue</p>
                  </Button>
                </div>
              </Card>
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
