"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { UpdateUserSchema, BadResponse, FormatPublicUser, GoodResponse } from "./userUtil";
import { revalidatePath } from "next/cache";

export async function updateUser(unparsedId: number, unparsedData: z.infer<typeof UpdateUserSchema>) {
  console.log("updateUser");
  try {
    const userDataParse = await UpdateUserSchema.safeParseAsync(unparsedData);
    if (!userDataParse.success) {
      return {
        success: false,
        error: {
          type: "parse",
          parseError: userDataParse.error.format(),
        },
      } satisfies BadResponse;
    }
    const idParse = await z.number().positive().safeParseAsync(unparsedId);
    if (!idParse.success) {
      return {
        success: false,
        error: {
          type: "parse",
          parseError: idParse.error.format(),
        },
      } satisfies BadResponse;
    }
    const user = await prisma.user.update({
      where: { id: idParse.data },
      data: userDataParse.data,
    });
    revalidatePath(`/`);
    revalidatePath(`/users`);
    revalidatePath(`/users/${user.id}`);
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
