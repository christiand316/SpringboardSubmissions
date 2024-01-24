"use server";

import { Prisma } from "@prisma/client";
import { z } from "zod";
import { BadResponse } from "../user/userUtil";
import { getUserSession } from "../auth/getUserSession";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const makePostSchema = z.object({
  content: z.string().min(1).max(40),
  title: z.string().min(1).max(255),
}) satisfies z.ZodType<Prisma.PostUncheckedCreateWithoutAuthorInput>;

export async function makePost(unparsedPostData: z.infer<typeof makePostSchema>) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      return {
        success: false,
        error: {
          type: "unauthorized",
        },
      } satisfies BadResponse;
    }
    const parsedPostData = await makePostSchema.safeParseAsync(unparsedPostData);
    if (!parsedPostData.success) {
      return {
        success: false,
        error: {
          type: "parse",
          fields: parsedPostData.error.format(),
        },
      } satisfies BadResponse;
    }
    const post = await prisma.post.create({
      data: {
        ...parsedPostData.data,
        author: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });
    revalidatePath(`/`);
    return {
      success: true,
      data: post,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        type: "internal",
      },
    } satisfies BadResponse;
  }
}
