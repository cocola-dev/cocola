/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CircleDot, MessageSquare, Tag, X } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Label } from "@/components/ui/label";
import * as timeago from "timeago.js";
import { IssuePullRequest, Repository } from "@prisma/client";
import Link from "next/link";
import { fetchRepo } from "@/actions/repo/fetch";
import React from "react";
import { fetchIssues } from "@/actions/repo/fetchIssues";
import { useCurrentUser } from "@/hooks/use-current-user";
import Loader2 from "@/components/Loader2";
import { CheckIcon } from "@radix-ui/react-icons";

const Page = ({
  params,
}: {
  params: { username: string; repository: string };
}) => {
  // ! React states.
  const [repo, setRepo] = React.useState<Repository | null>(null);
  const [issueData, setIssueData] = React.useState<IssuePullRequest[] | null>(
    null,
  );
  const [openIssues, setOpenIssues] = React.useState<number>(0);
  const [closedIssues, setClosedIssues] = React.useState<number>(0);
  const [isFetchingIssues, setIsFetchingIssues] =
    React.useState<boolean>(false);

  // ! hooks
  const user = useCurrentUser();

  // ! fetching data from server
  const fetchingRepositery = async () => {
    await fetchRepo(params.username, params.repository, user).then((res) => {
      console.log("fetchingRepositery", res);
      if (res.error) {
        setRepo(null);
      } else {
        if (res.repo) {
          setRepo(res.repo);
        }
      }
    });
  };

  const fetchingIssue = async () => {
    setIsFetchingIssues(true);
    await fetchIssues(repo)
      .then((res) => {
        setIssueData(res.issues);
        setOpenIssues(res.allOpenIssues);
        setClosedIssues(res.allClosedIssues);
      })
      .finally(() => setIsFetchingIssues(false));
  };

  React.useEffect(() => {
    fetchingRepositery();
  }, [params.username, params.repository]);

  React.useEffect(() => {
    if (repo) {
      fetchingIssue().finally(() => setIsFetchingIssues(false));
    }
  }, [repo]);

  return (
    <div className="">
      <Card className="w-[80%] m-auto grid bg-primary-foreground/35 placeholder: h-32 mt-6">
        <div className="flex justify-between items-center mt-2 text-xl">
          <div></div>
          <div>
            👋Want to contribute to{" "}
            <Label className="text-xl underline cursor-pointer text-blue-500">
              {params.username}/{params.repository}
            </Label>
            ?
          </div>
          <div>
            <Button variant={"ghost"} className="px-2 -ml-3 mr-3">
              <X size={16} />
            </Button>
          </div>
        </div>
        <div className="flex justify-center text-base">
          <p>
            If you have a bug or an idea, read the
            <Label className=" underline text-base mx-2 cursor-pointer text-blue-500">
              contributing guidelines
            </Label>
            before opening an issue.
          </p>
        </div>
      </Card>
      <div className="w-[80%] m-auto grid grid-cols-3 gap-3">
        <Card className="w-full bg-primary-foreground/35 place-items grid m-auto h-24 mt-3 p-4">
          <div className="text-base hover:text-[#2f81f7] cursor-pointer">
            Lucide 1.0 - Defining Scope
          </div>
          <div className="text-xs text-muted-foreground">
            #1687 opened on Nov 17, 2023 by ericfennis
          </div>
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              <CircleDot color="#3fb950" size={16} />{" "}
              <p className="text-xs text-muted-foreground ml-1">Open</p>
            </div>
            <div className="flex items-center hover:text-[#2f81f7]">
              <MessageSquare
                className="ml-3 cursor-pointer text-muted-foreground"
                size={16}
              />
              <p className="text-xs  text-muted-foreground ml-1">3</p>
            </div>
          </div>
        </Card>
        <Card className="w-full bg-primary-foreground/35 place-items grid m-auto h-24 mt-3 p-4">
          <div className="text-base hover:text-[#2f81f7] cursor-pointer">
            We&apos;re not accepting new.
          </div>
          <div className="text-xs text-muted-foreground">
            #670 opened on May 15, 2022 by a
          </div>
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              <CircleDot color="#3fb950" size={16} />{" "}
              <p className="text-xs text-muted-foreground ml-1">Open</p>
            </div>
            <div className="flex items-center hover:text-[#2f81f7]">
              <MessageSquare
                className="ml-3 cursor-pointer text-muted-foreground"
                size={16}
              />
              <p className="text-xs  text-muted-foreground ml-1">10</p>
            </div>
          </div>
        </Card>
        <Card className="w-full bg-primary-foreground/35 place-items grid m-auto h-24 mt-3 p-4">
          <div className="text-base hover:text-[#2f81f7] cursor-pointer">
            Icon Requests from Feather
          </div>
          <div className="text-xs text-muted-foreground">
            #119 opened on Oct 31, 2020 by Andreto
          </div>
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              <CircleDot color="#3fb950" size={16} />{" "}
              <p className="text-xs text-muted-foreground ml-1">Open</p>
            </div>
            <div className="flex items-center hover:text-[#2f81f7]">
              <MessageSquare
                className="ml-3 cursor-pointer text-muted-foreground"
                size={16}
              />
              <p className="text-xs  text-muted-foreground ml-1">5</p>
            </div>
          </div>
        </Card>
      </div>
      <div className="w-[80%] mt-4 m-auto flex justify-between items-center">
        <Input placeholder="Filter Commit..." className="max-w " />
        <Button className="mx-3" variant={"outline"}>
          <Tag size={16} className="mr-2" /> Labels
        </Button>
        <Button variant={"outline"} asChild>
          <Link href={"issues/new"}>New issues</Link>
        </Button>
      </div>

      {!isFetchingIssues ? (
        issueData?.length ? (
          <div className="w-[80%] mt-4 m-auto justify-center items-center">
            <Card className="w-full border-b-0 bg-primary-foreground items-center flex h-10  rounded-sm rounded-b-none p-3">
              <div className="flex items-center">
                <CircleDot size={18} />
                <p className="ml-3"> {openIssues} Open</p>
                <div className="text-muted-foreground hover:text-secondary-foreground cursor-pointer flex items-center justify-center">
                  <CheckIcon className="h-5 w-5 ml-3 mr-1" />
                  <p className=""> {closedIssues} Closed</p>
                </div>
              </div>
            </Card>

            <Card className="rounded-none border-t-0 rounded-b-md overflow-hidden">
              {issueData?.reverse().map((item, index) => (
                <Card
                  className="w-full items-center rounded-none border-r-0 border-l-0 border-b-0  p-3 justify-between hover:bg-primary-foreground flex h-16"
                  key={index}
                >
                  <div className="flex items-center ">
                    <div className="flex items-center">
                      <CircleDot color="#3fb950" size={18} />
                    </div>
                    <div className="ml-3">
                      <Link href={`/${params.username}/${params.repository}/issues/${item.number}`} className="mb-2">
                        {item.title}
                      </Link>
                      <div className="text-xs text-muted-foreground">
                        #{item.number} opened{" "}
                        {timeago.format(item.createdAt, "en_US")} by{" "}
                        <Link
                          className="hover:text-blue-500 hover:underline"
                          href={`/${item.author}`}
                        >
                          {item.author}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div>
                    {/* {item.message.length > 0 ? (
                      <div className="flex items-center mr-4">
                        <FaRegMessage />
                        <p className="ml-2">{item.message.length}</p>
                      </div>
                    ) : null} */}
                  </div>
                </Card>
              ))}
            </Card>
          </div>
        ) : (
          <div className="w-[80%] mt-4 m-auto flex justify-center items-center px-1 ">
            <h1>no any issue yet</h1>
          </div>
        )
      ) : (
        <div className=" mt-20 ">
          <Loader2 />
        </div>
      )}

      {issueData && issueData?.length >= 25 ? (
        <div className="mt-5">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      ) : null}
    </div>
  );
};

export default Page;
