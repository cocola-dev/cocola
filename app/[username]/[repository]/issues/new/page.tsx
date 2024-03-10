/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createIssue } from "@/actions/repo/createIssue";
import { useCurrentUser } from "@/hooks/use-current-user";
import { fetchRepo } from "@/actions/repo/fetch";
import { Repository } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarkdownReader from "@/components/mdx-components";
import { Write } from "@/components/ui/fancy-area/write";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import Alert from "@/components/alert/Alert";

const Page = ({
  params,
}: {
  params: { username: string; repository: string };
}) => {
  // * 🪝 hooks
  const user = useCurrentUser();
  const router = useRouter();

  // * 🗿 react states
  const [isLoading, setIsLoading] = React.useState(false);
  const [repo, setRepo] = React.useState<Repository | null>(null);
  const [textValue, setTextValue] = React.useState("");
  const [issueTitle, setIssueTitle] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  // * 📐 functions
  const fetchingRepositery = async () => {
    await fetchRepo(params.username, params.repository, user).then((res) => {
      console.log("fetchingRepositery", res);
      if (res.error) {
        setErrorMsg(res.error);
        setRepo(null);
      } else {
        if (res.repo) {
          setRepo(res.repo);
        }
      }
    });
  };

  React.useEffect(() => {
    fetchingRepositery();
  }, []);

  const handelSubmit = async () => {
    setIsLoading(true);
    if (!user || !repo) {
      return;
    }

    await createIssue({
      repositoryId: repo?.id,
      user: user?.username,
      title: issueTitle,
      body: textValue,
    })
      .then((res) => {
        if (!res.success && res.Message) {
          setErrorMsg(res.Message);
        }
        if (res?.success && res.data) {
          router.push(`${res.data.number}`);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="h-[85vh] w-[80%] m-auto p-4 ">
      <>
        <div className="flex w-full justify-between">
          <Avatar className="mt-5">
            <AvatarImage src={user?.image} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className="w-full m-5">
            <div className="grid items-center gap-4  mb-3">
              <Label htmlFor="name" className="text-lg">
                Add a title
              </Label>
              <Input
                onChange={(e) => setIssueTitle(e.target.value)}
                id="Title"
                name="title"
                placeholder="Title"
                className="col-span-3 "
                disabled={isLoading}
                required={true}
                autoFocus={true}
              />
            </div>
            <div className=" grid gap-4 mt-7">
              <div className="flex items-center">
                <h1 className=" text-lg">
                  Add a comment{" "}
                  <Label className="text-muted-foreground"> (optional) </Label>
                </h1>
              </div>
              <div className="">
                <div data-color-mode="dark">
                  <Tabs
                    defaultValue="write"
                    className="relative mr-auto w-full"
                  >
                    <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                      <TabsTrigger
                        value="write"
                        disabled={isLoading}
                        className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none "
                      >
                        Write
                      </TabsTrigger>
                      <TabsTrigger
                        value="preview"
                        disabled={isLoading}
                        className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none "
                      >
                        Preview
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent className="p-0" value="write">
                      <Write {...{ textValue, setTextValue, isLoading }} />
                    </TabsContent>
                    <TabsContent value="preview">
                      <Card className="rounded-md p-4 pb-10">
                        <MarkdownReader markdown={textValue} />
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
              <Alert message={errorMsg} variant="alert" />
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-end ">
          {isLoading ? (
            <Button className="mr-4" disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isLoading}
              className="mr-4"
              onClick={handelSubmit}
            >
              Submit new issue
            </Button>
          )}
        </div>
      </>
    </div>
  );
};

export default Page;
