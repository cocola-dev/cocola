"use server";

import { db } from "@/lib/db";

export const fetchRepoList = async (author: string, username?: string) => {
  if (!author) {
    return { error: "Invalid user!" };
  }

  if (username && username === author) {
    const repos = await db.repository.findMany({
      where: { author: author },
      orderBy: { updatedAt: "desc" },
      take: 4,
    });
    return { success: true, repos };
  }

  const repos = await db.repository.findMany({
    where: { author: author, Visibility: "public" },
    orderBy: { updatedAt: "desc" },
    take: 4,
  });
  return { success: true, repos };
};
