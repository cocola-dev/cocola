"use server";

import { db } from "@/lib/db";

export const ReandomRepos = async (
  limit: number,
) => {
  const ReandomRepo = await db.repository.findMany({
    take: 4,
    where: {
      Visibility: "public",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return { data: ReandomRepo };
};
