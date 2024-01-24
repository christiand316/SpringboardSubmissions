"use server";

import { z } from "zod";
import { BadResponse, FormatPublicUser, GoodResponse, PublicUser } from "./userUtil";
import { prisma } from "@/lib/prisma";
import { getUserSession } from "../auth/getUserSession";

export async function getUser(unparsedId: number) {
  try {
    const parse = await z.number().positive().safeParseAsync(unparsedId);
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
    const user = await prisma.user.findUnique({ where: { id: parse.data }, include: { followers: { where: { id: currentUser.id }, select: { id: true } }, _count: { select: { followers: true, following: true, likes: true, posts: true } } } });
    if (!user) {
      return {
        success: false,
        error: {
          type: "notFound",
          message: "User not found",
        },
      } satisfies BadResponse;
    }
    return {
      success: true,
      data: {
        user: FormatPublicUser(user),
        followersCount: user._count.followers,
        followingCount: user._count.following,
        likesCount: user._count.likes,
        postsCount: user._count.posts,
        isFollowing: !!user.followers.length,
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
