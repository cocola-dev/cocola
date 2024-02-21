"use server";

import { db } from "@/lib/db";

export const updateBio = async (username: string, bio: string) => {
  if (!username) {
    return { error: "Invalid user!" };
  }
  await db.user.update({
    where: { username: username },
    data: {
      bio: bio,
    },
  });

  return { success: "Profile update Successfully! 🎉" };
};
