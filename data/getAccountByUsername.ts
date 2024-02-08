"use server";

import { db } from "@/lib/db";

export const getAccountByUserId = async (username: string) => {
  try {
    const account = await db.user.findFirst({
      where: { username },
    });
    if (!account?.username) {
      return null;
    }
    return account;
  } catch (error) {
    console.error("Error fetching user account:", error);
  }
};
