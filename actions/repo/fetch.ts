"use server";

import { db } from "@/lib/db";
import { Repository, User } from "@prisma/client";

export const fetchRepo = async (
  username: string,
  repository: string,
  user?: User | null,
) => {
  if (!username || !repository) {
    return { error: "Invalid user or repository!" };
  }

  let repo: Repository | null = null;

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

  return { repo: repo };
};
