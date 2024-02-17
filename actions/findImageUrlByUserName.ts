"use server";

import { db } from "@/lib/db";

export const findImageUrlByUserName = async (userName: string) => {
  const user = await db.user.findUnique({
    where: {
      username: userName,
    },
  });
  let image = user?.image;
  return image;
};
