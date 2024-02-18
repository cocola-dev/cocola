"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { RepoSchema } from "@/schemas";
import { User } from "@prisma/client";

export const create = async (
  values: z.infer<typeof RepoSchema>,
  user: User,
) => {
  const validatedFields = RepoSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, description, visibility, branch } = validatedFields.data;

  if (!user?.username) {
    return { error: "Invalid user!" };
  }
  const existingRepo = await db.repository.findFirst({
    where: {
      name: name,
      author: user?.username,
    },
  });

  console.log(existingRepo);

  if (existingRepo) {
    return { error: "Repository already exist with this name!" };
  }

  if (user?.username && user?.id) {
    const repository = await db.repository.create({
      data: {
        name: name,
        description: description,
        Visibility: visibility,
        author: user?.username,
        authorId: user?.id,
        DefualtBranch: branch,
      },
    });

    await db.branch.create({
      data: {
        name: branch,
        repositoryId: repository.id,
      },
    });
    return { success: "Repository create Successfully! 🎉" };
  } else {
    return { error: "Invalid user!" };
  }
};
