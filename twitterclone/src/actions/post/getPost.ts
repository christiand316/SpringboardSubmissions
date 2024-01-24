"use server";

import { z } from "zod";
import { BadResponse, GoodResponse } from "../user/userUtil";
import { prisma } from "@/lib/prisma";
import { getUserSession } from "../auth/getUserSession";

export async function getPost(unparsedId: number) {
  try {
    const parsedId = await z.number().positive().safeParseAsync(unparsedId);
    if (!parsedId.success) {
      return {
        success: false,
        error: {
          type: "parse",
          fields: parsedId.error.format(),
        },
      } satisfies BadResponse;
    }
    const currentUser = await getUserSession();
    if (!currentUser) {
      return {
        success: false,
        error: {
          type: "unauthenticated",
          fields: "You must be logged in to do that",
        },
      } satisfies BadResponse;
    }

    const post = await prisma.post.findUnique({ where: { id: parsedId.data }, include: { likers: { where: { id: currentUser.id }, select: { id: true } }, _count: { select: { likers: true } } } });
    if (!post) {
      return {
        success: false,
        error: {
          type: "notFound",
          fields: "post",
        },
      } satisfies BadResponse;
    }
    return {
      success: true,
      data: {
        post: {
          id: post.id,
          title: post.title,
          content: post.content,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          authorId: post.authorId,
        },
        isLiked: !!post.likers.length,
        totalLikes: post._count.likers,
      },
    } satisfies GoodResponse;
  } catch (error) {
    return {
      success: false,
      error: {
        type: "internal",
        fields: error,
      },
    } satisfies BadResponse;
  }
}
