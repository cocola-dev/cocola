"use server";

import { db } from "@/lib/db";
import { Commit, User } from "@prisma/client";

export const addCommit = async (values: Commit, user: User) => {
  if (user?.username && user?.id) {
    await db.commit.create({
      data: {
        ...values,
        files: values.files as [],
      },
    });
    return { success: "Repository create Successfully! 🎉" };
  } else {
    return { error: "Invalid user!" };
  }
};
