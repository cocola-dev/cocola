"use server";

import { db } from "@/lib/db";

export const getUserByUsername = async (username: string) => {
  const user = await db.user.findFirst({
    where: {
      username: username,
    },
  });
  if (!user) return null;
  return user;
};
