"use server";

import * as z from "zod";
import { update } from "@/auth";
import { db } from "@/lib/db";
import { UpdateProfilePic } from "@/schemas";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { useSession } from "next-auth/react";

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
    user: updatedUser,
  });

  //   update the user session.

  return { success: "Settings Updated!" };
};
