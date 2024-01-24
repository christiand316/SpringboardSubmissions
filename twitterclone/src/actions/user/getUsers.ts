"use server";

import { prisma } from "@/lib/prisma";
import { BadResponse, FormatPublicUser, GoodResponse, PublicUser } from "./userUtil";
import { boolean, z } from "zod";
import { User } from "@prisma/client";
import { get } from "http";
import { getUserSession } from "../auth/getUserSession";

type Pagination = {
  cursor: number;
  limit: number;
};

type SearchConfig = {
  search?: string;
  pagination?: Pagination;
};

export async function getUsers({ search: unparsedSearch, pagination: unparsedPagination }: SearchConfig = {}) {
  try {
    let search: string | null = null;
    let pagination: Pagination | null = null;
    if (unparsedSearch) {
      const parseResult = await z.string().safeParseAsync(unparsedSearch);
      if (!parseResult.success) {
        return {
          success: false,
          error: {
            type: "parse",
            parseError: parseResult.error.format(),
          },
        } satisfies BadResponse;
      }
      search = parseResult.data;
    }
    if (unparsedPagination) {
      const parseResult = await z
        .object({
          cursor: z.number().positive(),
          limit: z.number().positive(),
        })
        .safeParseAsync(unparsedPagination);
      if (!parseResult.success) {
        return {
          success: false,
          error: {
            type: "parse",
            parseError: parseResult.error.format(),
          },
        } satisfies BadResponse;
      }
      pagination = parseResult.data;
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

    const users = await prisma.user.findMany({
      where: {
        ...(search ? { name: { startsWith: search } } : {}),
      },
      skip: 1,
      ...(pagination?.cursor && {
        cursor: {
          id: pagination.cursor,
        },
      }),
      ...(pagination?.limit && { take: pagination.limit }),
      include: {
        followers: {
          where: {
            id: currentUser.id,
          },
          select: {
            id: true,
          },
        },
      },
    });
    const formattedUsers = users.map((user) => {
      return {
        ...FormatPublicUser(user),
        isFollowing: user.followers.length > 0,
      };
    });
    return {
      success: true,
      data: {
        users: formattedUsers,
        hasIsFollowingFlag: true,
        hasMore: users.length === pagination?.limit,
        finalElementId: users[users.length - 1]?.id,
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

async function testTypes() {
  const response = await getUsers();
  if (response.success) {
    if (response.data.hasIsFollowingFlag) {
      response.data.users[0];
    } else {
      response.data.finalElementId;
      const response2 = await getUsers({
        pagination: {
          cursor: response.data.finalElementId,
          limit: 1,
        },
      });
      if (response2.success) {
        response2.data.users[0].isFollowing;
      }
    }
    response.data.users[0].email;
  }
}
