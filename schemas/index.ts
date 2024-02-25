import * as z from "zod";
import { UserRole } from "@prisma/client";

const VisibilityEnum = z.enum(["public", "private"]);

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER, UserRole.BOT]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    },
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RepoSchema = z.object({
  name: z.string().refine((value) => /^[a-zA-Z0-9-]+$/.test(value), {
    message:
      "Invalid characters in the name. Only letters, numbers, and hyphens are allowed.",
  }),
  description: z.string(),
  visibility: VisibilityEnum.default("public"),
  branch: z
    .string()
    .min(1, {
      message: "Password is required",
    })
    .default("main"),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  username: z.string().min(1, {
    message: "Name is required",
  }),
});

export const UpdateProfilePic = z.object({
  image: z.string(),
});

export const settings_Public_Profile_schema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
  Bio: z.string().max(160).optional(),
  Pronouns: z.string().optional(),
  URL: z.string().url(),
  Company: z.string().optional(),
  country: z.string().optional(),
});
