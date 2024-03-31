"use server";

import { db } from "@/lib/db";
import { Comment } from "@prisma/client";

export const createComment = async ({
  repositoryPath,
  body,
  user,
  IssuePullRequestId,
}: {
  repositoryPath: string | null;
  body: string | null;
  user: string | undefined;
  IssuePullRequestId: string | undefined;
}) => {
  if (!repositoryPath || !user || !IssuePullRequestId) {
    return { data: null, success: false };
  }

  if (!body) {
    return { data: null, success: false, Message: "Body is required" };
  }

  // find last comment number

  const latestComment = await db.comment.findFirst({
    where: {
      repositoryPath: repositoryPath,
    },
    orderBy: {
      number: "desc",
    },
  });

  // ! DEBUG: [X] console.log("latestComment", latestComment);

  //   crete new comment with body author number issuePullRequestDiscussionId

  const nextIssueNumber: number = latestComment ? latestComment.number + 1 : 1;

  // ! DEBUG: [X] console.log("nextIssueNumber", nextIssueNumber)

  const comment: Comment = await db.comment.create({
    data: {
      body: body,
      author: user,
      repositoryPath: repositoryPath,
      number: nextIssueNumber,
      issuePullRequestDiscussionId: IssuePullRequestId,
    },
  });

  // find issuePullRed and update commentscount to + 1

  await db.issuePullRequest.update({
    where: {
      id: IssuePullRequestId,
      repositoryPath: repositoryPath,
    },
    data: {
      commentscount: {
        increment: 1
      }
    }
  })

  return { data: comment, success: true };
};
