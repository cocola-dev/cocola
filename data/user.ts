import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    // console.log("finding user getUserByEmail", email)
    const user = await db.user.findUnique({ where: { email: email } });
    // console.log("finding user getUserByEmail", user)

    return user;
  } catch {
    return null;
  }
};

export const getUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({ where: { username } });

  if (!user) {
    return null;
  }
  return user;
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};
