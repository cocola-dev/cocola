"use server";

import { db } from "@/lib/db";
import { Comment } from "@prisma/client";

type FetchCommentsResult = {
  success: boolean;
  message?: string;
  data?: Comment[];
};

export const fetchComments = async ({
  repositoryPath,
  issuePullRequestDiscussionId,
}: {
  repositoryPath: string | null;
  issuePullRequestDiscussionId: string | undefined;
}): Promise<FetchCommentsResult> => {
  if (!repositoryPath || !issuePullRequestDiscussionId) {
    return {
      success: false,
      message: "repositoryPath and issuePullRequestDiscussionId is req!",
    };
  }

  const data = await db.comment.findMany({
    where: {
      repositoryPath: repositoryPath,
      issuePullRequestDiscussionId: issuePullRequestDiscussionId,
    },
  });

  return { success: true, data: data };
};
