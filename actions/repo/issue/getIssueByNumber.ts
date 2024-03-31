"use server";

import { db } from "@/lib/db";

export const getIssueByNumber = async (
  number: number | null,
  repositoryPath: string | undefined,
) => {
  if (!number || !repositoryPath) {
    return { error: "Invalid number or repository" };
  }

  const issues = await db.issuePullRequest.findFirst({
    where: {
      number: Number(number),
      repositoryPath: repositoryPath,
    },
  });

  return {
    success: issues,
  };
};
