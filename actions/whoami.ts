"use server";

import { db } from "@/lib/db";

export const whoami = async (currentUser: any) => {
  const { ...userdata } = await db.user.findUnique({
    where: { email: currentUser?.email as string | undefined },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      image: true,
      password: false,
      role: true,
      isTwoFactorEnabled: true,
      username: true,
      lname: true,
      displayName: true,
      profileImage: true,
      coverImage: true,
      bio: true,
      dateOfBirth: true,
      gender: true,
      phone: true,
      street: true,
      city: true,
      state: true,
      zipcode: true,
      country: true,
      facebook: true,
      twitter: true,
      instagram: true,
      linkedin: true,
      website: true,
      createdAt: true,
      updatedAt: true,
      accounts: true,
      twoFactorConfirmation: true,
      _count: true,
    },
  });

  return { userdata };
};
