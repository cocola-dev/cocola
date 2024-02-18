"use server";

import { db } from "@/lib/db";
import { User } from "@prisma/client";

export const fetchRepo = async (
  username: string,
  repository: string,
  user?: User | null,
) => {
  if (!username || !repository) {
    return { error: "Invalid user or repository!" };
  }

  let repo;

  if (user?.username === username) {
    repo = await db.repository.findFirst({
      where: {
        name: repository,
        author: username,
      },
    });
  } else {
    repo = await db.repository.findFirst({
      where: {
        name: repository,
        author: username,
        Visibility: "public",
      },
    });
  }

  if (!repo) {
    return { error: "Repository not found!", statuscode: 404 };
  }

  const branches = await db.branch.findMany({
    where: {
      repositoryId: repo.id,
    },
  });

  return { repo, branchCount: branches.length };
};
