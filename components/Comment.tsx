import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { ASSETS } from "@/data/variables";
import { Comment, IssuePullRequest } from "@prisma/client";
import * as timeago from "timeago.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useCurrentUser } from "@/hooks/use-current-user";
import { PUBLIC_URL } from "@/resources";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Write } from "./ui/fancy-area/write";
import { Button } from "./ui/button";
import MarkdownReader from "./mdx-components";
import { Smile } from "lucide-react";
import React from "react";

const CommentBox = ({
  comment,
  refData,
  params,
  asHeader = false,
}: {
  comment?: Comment;
  refData: IssuePullRequest;
  params: Params;
  asHeader?: boolean;
}) => {
  // * hooks
  const user = useCurrentUser();

  const [textValue, setTextValue] = React.useState("");

  return (
    <Card
      id={`comment-${comment?.number}`}
      className="flex relative mb-7 w-full border-none shadow-none rounded-md"
    >
      <div>
        <Avatar asChild>
          <Link href={asHeader ? `/${refData?.author}` : `/${comment?.author}`}>
            <AvatarImage
              src={
                asHeader
                  ? `${ASSETS}/${refData.author}.png`
                  : `${ASSETS}/${comment?.author}.png`
              }
              alt={comment?.author || "profile"}
            />
            <AvatarFallback> </AvatarFallback>
          </Link>
        </Avatar>
      </div>
      <div
        className={`w-full ml-4 comment-triangle after:bg-[#fafafa] before:bg-[#fafafa] after:dark:bg-[#171717] before:dark:bg-[#171717] ${user?.username === comment?.author ? "comment-triangle-author" : ""} ${location.hash === `#comment-${comment?.number}` && "comment-triangle-action"}`}
      >
        <Card
          className={`w-full overflow-hidden  rounded-md ${user?.username === comment?.author ? "border-[#404040]" : ""} ${location.hash === `#comment-${comment?.number}` && "border-white"}`}
        >
          <div
            className={`border-b p-3 bg-primary-foreground flex justify-between w-full  ${user?.username === comment?.author ? "border-[#404040]" : ""} ${location.hash === `#comment-${comment?.number}` && "border-white"}`}
          >
            <p className="text-muted-foreground text-sm">
              {comment?.author || refData.author} commented{" "}
              {refData
                ? timeago.format(
                    comment?.createdAt || refData.createdAt,
                    "en_US",
                  )
                : null}
            </p>
            {comment?.isEdited && <Badge variant="secondary"> • Edited</Badge>}
            <div className="flex items-center justify-center gap-2">
              {refData?.author === comment?.author && (
                <Badge
                  variant="outline"
                  className={`${refData?.author === comment.author ? "border-[#404040]" : ""} ${location.hash === `#comment-${comment.number}` && "border-white"}`}
                >
                  {" "}
                  Author{" "}
                </Badge>
              )}
              <Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <DotsHorizontalIcon />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {comment?.author === user?.username && (
                      <DialogTrigger asChild>
                        <DropdownMenuItem>
                          <span>Edit</span>
                        </DropdownMenuItem>
                      </DialogTrigger>
                    )}
                    <DropdownMenuItem
                      onClick={() =>
                        !asHeader &&
                        navigator.clipboard.writeText(
                          `${PUBLIC_URL}/${params.username}/${params.repository}/issues/${params.issueNum}#comment-${comment?.number}`,
                        )
                      }
                    >
                      Copy link
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Report content</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit comment #{comment?.number}</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. Are you sure you want to
                      edit this comment?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogContent>
                    <Write {...{ textValue, setTextValue }} />
                  </DialogContent>
                  <DialogFooter>
                    <Button type="submit">Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className=" px-4 pt-2">
            <MarkdownReader markdown={comment?.body || refData.body} />
          </div>
          <div className="px-4 mt-6 mb-2 ">
            <Button variant={"ghost"} className="rounded-full m-0 px-2">
              <Smile size={20} className="text-muted-foreground" />
            </Button>
          </div>
        </Card>
        <div className="absolute bg-border left-10 w-px h-52 -z-10"></div>
      </div>
    </Card>
  );
};

export default CommentBox;
