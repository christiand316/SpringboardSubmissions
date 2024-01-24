"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getUserSession } from "../auth/getUserSession";
import { BadResponse, GoodResponse } from "../user/userUtil";

export async function toggleLikePost(unparsedPostId: number, currentlyLiked: boolean = false) {
  try {
    const parse = await z.number().positive().safeParseAsync(unparsedPostId);
    if (!parse.success) {
      return {
        success: false,
        error: {
          type: "parse",
          parseError: parse.error.format(),
        },
      } satisfies BadResponse;
    }
    const currentUser = await getUserSession();
    if (!currentUser) {
      return {
        success: false,
        error: {
          type: "unauthenticated",
          message: "You must be logged in to do that",
        },
      } satisfies BadResponse;
    }
    const post = await prisma.post.findUnique({ where: { id: parse.data }, include: { likers: { where: { id: currentUser.id }, select: { id: true } }, _count: { select: { likers: { where: {} } } } } });
    if (!post) {
      return {
        success: false,
        error: {
          type: "notFound",
          message: "Post not found",
        },
      } satisfies BadResponse;
    }
    if (currentlyLiked) {
      await prisma.post.update({
        where: { id: post.id },
        data: {
          likers: {
            disconnect: {
              id: currentUser.id,
            },
          },
        },
      });
    } else {
      await prisma.post.update({
        where: { id: post.id },
        data: {
          likers: {
            connect: {
              id: currentUser.id,
            },
          },
        },
      });
    }

    return {
      success: true,
      data: {
        currentLikeStatus: !currentlyLiked,
        totalLikes: post._count.likers + (currentlyLiked ? -1 : 1),
      },
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
