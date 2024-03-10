"use server";

import { db } from "@/lib/db";
import { Repository } from "@prisma/client";

export const fetchIssues = async (
  repository: Repository | null,
  page: number = 1,
) => {
  const pageSize = 10; // Number of items per page
  const offset = (page - 1) * pageSize; // Calculate the offset based on the page number

  const issues = await db.issuePullRequest.findMany({
    where: {
      isIssue: true,
      isOpen: true,
      repositoryId: repository?.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
    skip: offset,
    take: pageSize,
  });

  const allOpenIssues = await db.issuePullRequest.count({
    where: {
      isIssue: true,
      isOpen: true,
      repositoryId: repository?.id,
    },
  });

  const allClosedIssues = await db.issuePullRequest.count({
    where: {
      isIssue: true,
      isOpen: false,
      repositoryId: repository?.id,
    },
  });

  return { issues, allOpenIssues, allClosedIssues };
};
