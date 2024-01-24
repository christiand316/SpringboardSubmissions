"use server";

import { z } from "zod";
import { getUserSession } from "../auth/getUserSession";
import { BadResponse, GoodResponse } from "./userUtil";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function followUser(unparsedUserToFollowId: number) {
  try {
    const parse = await z.number().positive().safeParseAsync(unparsedUserToFollowId);
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
    const userToFollow = await prisma.user.findUnique({ where: { id: parse.data } });
    if (!userToFollow) {
      return {
        success: false,
        error: {
          type: "notFound",
          message: "User not found",
        },
      } satisfies BadResponse;
    }
    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        following: {
          connect: {
            id: userToFollow.id,
          },
        },
      },
    });
    revalidatePath(`/users/${userToFollow.id}`);
    return {
      success: true,
      data: null,
    } satisfies GoodResponse;
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: {
        type: "internal",
      },
    } satisfies BadResponse;
  }
}

export async function unfollowUser(unparsedUserToUnfollowId: number) {
  try {
    const parse = await z.number().positive().safeParseAsync(unparsedUserToUnfollowId);
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
    const userToUnfollow = await prisma.user.findUnique({ where: { id: parse.data } });
    if (!userToUnfollow) {
      return {
        success: false,
        error: {
          type: "notFound",
          message: "User not found",
        },
      } satisfies BadResponse;
    }
    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        following: {
          disconnect: {
            id: userToUnfollow.id,
          },
        },
      },
    });
    revalidatePath(`/users/${userToUnfollow.id}`);
    return {
      success: true,
      data: null,
    } satisfies GoodResponse;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: {
        type: "internal",
      },
    } satisfies BadResponse;
  }
}
