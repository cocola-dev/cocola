"use server";

import { db } from "@/lib/db";
import { IssuePullRequest } from "@prisma/client";

export const createIssue = async ({
  repositoryId,
  repositoryPath,
  user,
  title,
  body,
}: {
  repositoryId: string | null;
  repositoryPath: string | null;
  user: string | null;
  title: string | null;
  body?: string | null;
}) => {
  if (!repositoryId || !user || !repositoryPath) {
    return { data: null, success: false };
  }

  if (!title) {
    return { data: null, success: false, Message: "Title is required" };
  }

  const latestIssue = await db.issuePullRequest.findFirst({
    where: {
      repositoryId: repositoryId,
    },
    orderBy: {
      number: "desc",
    },
  });

  const nextIssueNumber: number = latestIssue ? latestIssue.number + 1 : 1;

  const issues: IssuePullRequest = await db.issuePullRequest.create({
    data: {
      isIssue: true,
      author: user,
      repositoryId: repositoryId as string, // Fix: Ensure repositoryId is of type string
      repositoryPath: repositoryPath,
      number: nextIssueNumber,
      title: title,
      body: body,
    },
  });

  return { data: issues, success: true };
};
