"use server";

import { z } from "zod";
import {
  BadResponse,
  CreateUserSchema,
  FormatPublicUser,
  GoodResponse,
} from "./userUtil";
import { prisma } from "@/lib/prisma";
import { createToken } from "../auth/createToken";
import * as bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

export async function registerUser(
  unparsedData: z.infer<typeof CreateUserSchema>
) {
  try {
    const parse = await CreateUserSchema.safeParseAsync(unparsedData);
    if (!parse.success) {
      return {
        success: false,
        error: {
          type: "parse",
          parseError: parse.error.format(),
        },
      } satisfies BadResponse;
    }
    //Checks if email is already taken
    if (await prisma.user.findUnique({ where: { email: parse.data.email } })) {
      return {
        success: false,
        error: {
          type: "alreadyTaken",
          message: "Email already exists",
        },
      } satisfies BadResponse;
    }
    const hashedPassword = await bcrypt.hash(parse.data.password, 10);
    const user = await prisma.user.create({
      data: { ...parse.data, password: hashedPassword },
    });
    await createToken(user.id);
    revalidatePath("/users");
    return {
      success: true,
      data: FormatPublicUser(user),
    } satisfies GoodResponse;
  } catch (error) {
    return {
      success: false,
      error: {
        type: "internal",
      },
    } satisfies BadResponse;
  }
}
