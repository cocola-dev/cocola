/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { getIssueByNumber } from "@/actions/repo/issue/getIssueByNumber";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Comment, IssuePullRequest } from "@prisma/client";
import {
  Check,
  CircleDot,
  GitCommitHorizontal,
  Loader2,
  Smile,
  Tag,
  X,
} from "lucide-react";
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
  DotsHorizontalIcon,
  DrawingPinIcon,
  GearIcon,
  InfoCircledIcon,
  LockClosedIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Write } from "@/components/ui/fancy-area/write";
import ContentLoader from "@/components/ContentLoader";
import { createComment } from "@/actions/repo/issue/createComment";
import { fetchComments } from "@/actions/repo/commments/fetchComments";
import CommentBox from "@/components/Comment";
import { Badge } from "@/components/ui/badge";

const Page = ({
  params,
}: {
  params: { username: string; repository: string; issueNum: number };
}) => {
  // * hooks
  const user = useCurrentUser();
  const repositoryPath = `${params.username}/${params.repository}`;

  // * states
  const [issue, setIssue] = React.useState<IssuePullRequest | null>(null);
  const [isLoadin, setIsLoadin] = React.useState(true);
  const [textValue, setTextValue] = React.useState("");
  const [commentList, setCommentList] = React.useState<Comment[] | []>([]);
  const [isPandingComment, setIsPandingComment] = React.useState(false);

  // * 📐 functions
  const FetchIssue = async () => {
    setIsLoadin(true);

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

  // * 🚀 handel comment
  const handelComment = async () => {
    setIsPandingComment(true);
    await createComment({
      repositoryPath: repositoryPath,
      body: textValue,
      user: user?.username,
      IssuePullRequestId: issue?.id,
    })
      .then((data) => {
        console.log(data);
        FetchIssue();
        setTextValue("");
      })
      .finally(() => setIsPandingComment(false));
  };

  const fetchCommentlist = async () => {
    await fetchComments({
      repositoryPath: repositoryPath,
      issuePullRequestDiscussionId: issue?.id,
    }).then((data) => {
      if (data.success && data.data) {
        setCommentList(data?.data);
      }
    });
  };

  React.useEffect(() => {
    if (issue) {
      fetchCommentlist();
    }
  }, [issue]);

  return (
    <div>
      {isLoadin ? (
        <div className="w-[80%] m-auto mt-10 flex justify-center items-center">
          <ContentLoader />
        </div>
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
              <div className="grid w-full">
                {/* // * massage body */}

                {issue && (
                  <CommentBox asHeader refData={issue} params={params} />
                )}

                {/* all comments are map here. */}
                {/* // ? <><><><><><><><><>  map start from bottom <><><><><><><><><> */}

                {/* // ! test section */}

                {/* // todo: first damin */}
                <Card className="flex border-none shadow-none relative mb-7 w-full rounded-md">
                  <div>
                    <div className="h-10 w-10"></div>
                  </div>
                  <div className={`w-full ml-4 relative`}>
                    <Card
                      className={`w-full flex items-center border-none shadow-none h-10 ml-5 rounded-md `}
                    >
                      <Card className="rounded-full m-0 text-muted-foreground p-2 bg-primary-foreground/35">
                        <Tag size={20} />
                      </Card>
                      <Avatar className="h-7 w-7 mx-2">
                        <AvatarImage
                          src="https://github.com/ruru-m07.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>RU</AvatarFallback>
                      </Avatar>
                      <small className="text-sm font-medium leading-none">
                        ruru-m07{" "}
                        <small className="text-sm text-muted-foreground">
                          added{" "}
                        </small>
                        <Badge
                          className="text-[#16a34a] mr-2 ml-1 border-[#16a34a]/35 bg-[#16a34a]/10"
                          variant="outline"
                        >
                          good first issue
                        </Badge>
                        <small className="text-sm text-muted-foreground">
                          label{" "}
                        </small>
                        <Link href={""}>
                          <small className="text-sm text-muted-foreground hover:underline hover:text-blue-500">
                            1 weeks ago{" "}
                          </small>
                        </Link>
                      </small>
                    </Card>
                    <div className="absolute bg-border left-10 w-px h-52 -z-10"></div>
                  </div>
                </Card>

                {/* // todo: second damin */}
                {/* // * commit on issue: 1 */}
                <Card className="flex border-none shadow-none relative mb-7 w-full rounded-md">
                  <div>
                    <div className="h-10 w-10"></div>
                  </div>
                  <div className={`w-full ml-4 relative`}>
                    <Card
                      className={`w-full flex items-center border-none shadow-none h-10 ml-5 rounded-md `}
                    >
                      <Card className="rounded-full m-0 text-muted-foreground p-2 bg-primary-foreground/35">
                        <GitCommitHorizontal size={20} />
                      </Card>
                      <Avatar className="h-7 w-7 mx-2">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>RU</AvatarFallback>
                      </Avatar>
                      <div className="flex w-full justify-between items-center">
                        <small className="text-sm font-medium leading-none">
                          shadcn{" "}
                          <small className="text-sm text-muted-foreground">
                            commit{" "}
                          </small>
                          <small className="text-sm text-muted-foreground">
                            fix(fetch-cache): removing unnecessary
                            &apos;FETCH&apos; check{" "}
                          </small>
                          <Link href={""}>
                            <small className="text-sm text-muted-foreground hover:underline hover:text-blue-500">
                              4 day ago{" "}
                            </small>
                          </Link>
                        </small>
                        <div className="items-center  flex">
                          <X color="#b91c1c" size={16} className="m-1 mt-2" />
                          <small className="text-sm text-muted-foreground hover:underline hover:text-blue-500 mr-5">
                            98ch8ga
                          </small>
                        </div>
                      </div>
                    </Card>
                    <div className="absolute bg-border left-10 w-px h-52 -z-10"></div>
                  </div>
                </Card>

                {/* // * commit on issue: 2 */}
                <Card className="flex border-none shadow-none relative mb-7 w-full rounded-md">
                  <div>
                    <div className="h-10 w-10"></div>
                  </div>
                  <div className={`w-full ml-4 relative`}>
                    <Card
                      className={`w-full flex items-center border-none shadow-none h-10 ml-5 rounded-md `}
                    >
                      <Card className="rounded-full m-0 text-muted-foreground p-2 bg-primary-foreground/35">
                        <GitCommitHorizontal size={20} />
                      </Card>
                      <Avatar className="h-7 w-7 mx-2">
                        <AvatarImage
                          src="https://github.com/samcx.png"
                          alt="@samcx"
                        />
                        <AvatarFallback>RU</AvatarFallback>
                      </Avatar>
                      <div className="flex w-full justify-between items-center">
                        <small className="text-sm font-medium leading-none">
                          samcx{" "}
                          <small className="text-sm text-muted-foreground">
                            commit{" "}
                          </small>
                          <small className="text-sm text-muted-foreground">
                            fix(fetch-cache): re-add &apos;FETCH&apos; check{" "}
                          </small>
                          <Link href={""}>
                            <small className="text-sm text-muted-foreground hover:underline hover:text-blue-500">
                              2 day ago{" "}
                            </small>
                          </Link>
                        </small>
                        <div className="items-center  flex">
                          <Check
                            color="#16a34a"
                            size={16}
                            className="m-1 mt-2"
                          />
                          <small className="text-sm text-muted-foreground hover:underline hover:text-blue-500 mr-5">
                            2cd7f6c
                          </small>
                        </div>
                      </div>
                    </Card>
                    <div className="absolute bg-border left-10 w-px h-52 -z-10"></div>
                  </div>
                </Card>

                {/* // ! test section */}

                {commentList && issue && params
                  ? commentList?.map((comment, index) => (
                      <CommentBox
                        key={index}
                        comment={comment}
                        refData={issue}
                        params={params}
                      />
                    ))
                  : null}

                {/* // * commit on issue: 2 */}
                <Card className="flex border-none shadow-none relative mb-7 w-full rounded-md">
                  <div>
                    <div className="h-10 w-10"></div>
                  </div>
                  <div className={`w-full ml-4 relative`}>
                    <Card
                      className={`w-full flex items-center border-none shadow-none h-10 ml-5 rounded-md `}
                    >
                      <Card className="rounded-full m-0 text-muted-foreground p-2 bg-primary-foreground/35">
                        <GitCommitHorizontal size={20} />
                      </Card>
                      <Avatar className="h-7 w-7 mx-2">
                        <AvatarImage
                          src="https://github.com/JeonEno.png"
                          alt="@JeonEno"
                        />
                        <AvatarFallback>RU</AvatarFallback>
                      </Avatar>
                      <div className="flex w-full justify-between items-center">
                        <small className="text-sm font-medium leading-none">
                          JeonEno{" "}
                          <small className="text-sm text-muted-foreground">
                            commit{" "}
                          </small>
                          <small className="text-sm text-muted-foreground">
                            fix: prevent scrolling to hash {" "}
                          </small>
                          <Link href={""}>
                            <small className="text-sm text-muted-foreground hover:underline hover:text-blue-500">
                              1 hours ago{" "}
                            </small>
                          </Link>
                        </small>
                        <div className="items-center  flex">
                          <Check
                            color="#16a34a"
                            size={16}
                            className="m-1 mt-2"
                          />
                          <small className="text-sm text-muted-foreground hover:underline hover:text-blue-500 mr-5">
                            9d73jo8
                          </small>
                        </div>
                      </div>
                    </Card>
                    <div className="absolute bg-border left-10 w-px h-52 -z-10"></div>
                  </div>
                </Card>

                {/* // ? <><><><><><><><><>  map end in top <><><><><><><><><> */}

                {/* // ! Add a comment section */}
                <Separator />
                <Card className="grid mb-7 border-none shadow-none py-4 overflow-hidden w-full rounded-md">
                  <div className="flex">
                    <div>
                      <Avatar asChild>
                        <Link href={`/${user?.username}`}>
                          <AvatarImage
                            src={`${ASSETS}/${user?.username}.png`}
                            alt={user?.username || "profile"}
                          />
                          <AvatarFallback> </AvatarFallback>
                        </Link>
                      </Avatar>
                    </div>
                    <div
                      className={`w-full ml-4 comment-triangle ${user?.username === user?.username ? "comment-triangle-author" : ""}`}
                    >
                      <Card
                        className={`w-full overflow-hidden h-full rounded-md ${user?.username === user?.username ? "border-[#404040]" : ""} `}
                      >
                        <div
                          className={`border-b p-3 bg-primary-foreground   ${user?.username === user?.username ? "border-[#404040]" : ""}`}
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
                    <Button
                      className=" gap-2"
                      disabled={isPandingComment}
                      onClick={handelComment}
                    >
                      {isPandingComment && <ContentLoader size={4} dark />}
                      Comment
                    </Button>
                  </div>
                </Card>
              </div>

              {/* // ! right side section */}
              <Card className="w-96 border-none shadow-none p-4">
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
