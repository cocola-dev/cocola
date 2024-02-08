"use server";

import { db } from "@/lib/db";

export const create = async () => {
  const commitresult = await db.commit.create({
    data: {
      commitId: "3",
      title: "Initial Commit",
      description: " Initial Commit of the repository",
      branch: "master",
      repositoryId: "65c339bbf67715e59d92337d",
    },
  });
  return {
    success: "create commit Successfully! 🎉",
    commitresult: commitresult,
  };
};
