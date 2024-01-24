"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { createToken } from "../auth/createToken";
import { BadResponse, FormatPublicUser, GoodResponse } from "./userUtil";
import * as bcrypt from "bcrypt";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
});

export async function loginUser(unparsedData: z.infer<typeof loginSchema>) {
  try {
    const parse = await loginSchema.safeParseAsync(unparsedData);
    if (!parse.success) {
      return {
        success: false,
        error: {
          type: "parse",
          parseError: parse.error.format(),
        },
      } satisfies BadResponse;
    }
    const user = await prisma.user.findUnique({
      where: { email: parse.data.email },
    });
    if (!user) {
      return {
        success: false,
        error: {
          type: "notFound",
          message: "User not found",
        },
      } satisfies BadResponse;
    }
    const passwordMatch = await bcrypt.compare(
      parse.data.password,
      user.password
    );
    if (!passwordMatch) {
      return {
        success: false,
        error: {
          type: "invalid",
          message: "Invalid password",
        },
      } satisfies BadResponse;
    }
    await createToken(user.id);
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
