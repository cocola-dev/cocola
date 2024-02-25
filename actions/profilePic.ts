"use server";

import * as z from "zod";
import { update } from "@/auth";
import { db } from "@/lib/db";
import { UpdateProfilePic } from "@/schemas";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

export const UpdateProfilePicAction = async (
  values: z.infer<typeof UpdateProfilePic>,
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  update({
    user: {
      image: updatedUser.image,
    },
  });

  return { success: "Settings Updated!" };
};
