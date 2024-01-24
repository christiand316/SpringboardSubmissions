import { Prisma, PrismaClient, User } from "@prisma/client";
import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8).max(50),
}) satisfies z.ZodType<Prisma.UserCreateInput>;

export const UpdateUserSchema = z.object({
  name: z.string().min(3).optional(),
  password: z.string().min(8).max(50).optional(),
  bio: z.string().max(160).optional(),
}) satisfies z.ZodType<Prisma.UserUpdateInput>;

export type PublicUser = {
  id: number;
  name: string;
  email: string;
};

export function FormatPublicUser(user: Prisma.UserGetPayload<{ select: { id: true; name: true; email: true; bio: true; createdAt: true; updatedAt: true } }>) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    bio: user.bio,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  } satisfies Prisma.UserGetPayload<{ select: { id: true; name: true; email: true; bio: true; createdAt: true; updatedAt: true } }>;
}

export interface GoodResponse {
  success: true;
  data: any;
}

export interface BadResponse {
  success: false;
  error: {
    type: ErrorTypes;
    [key: string]: any;
  };
}

type ErrorTypes = "parse" | "unauthorized" | "unauthenticated" | "notFound" | "alreadyTaken" | "invalid" | "internal";
