"use server";

import { db } from "@/lib/db";

export const fetchrepo = async (username: string, repository: string) => {
  if (!username && !repository) {
    return { error: "Invalid user!" };
  }

  const repo = await db.repository.findFirst({
    where: {
      name: repository,
      author: username,
    },
  });
  console.log(repo);
  return { repo: repo };
};
