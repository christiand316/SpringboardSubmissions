"use server";

import { z } from "zod";
import { BadResponse, GoodResponse } from "../user/userUtil";
import { prisma } from "@/lib/prisma";

type Pagination = {
  cursor: number;
  limit: number;
};

type SearchConfig = {
  search?: string;
  fromUserId?: number;
  pagination?: Pagination;
};

export async function getPosts({ search: unparsedSearch, fromUserId: unparsedFromUserId, pagination: unparsedPagination }: SearchConfig = {}) {
  try {
    let search: string | null = null;
    let fromUserId: number | null = null;
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
    if (unparsedFromUserId) {
      const parseResult = await z.number().positive().safeParseAsync(unparsedFromUserId);
      if (!parseResult.success) {
        return {
          success: false,
          error: {
            type: "parse",
            parseError: parseResult.error.format(),
          },
        } satisfies BadResponse;
      }
      fromUserId = parseResult.data;
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

    const posts = await prisma.post.findMany({
      where: {
        ...(search && {
          OR: [
            {
              title: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              content: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }),
        ...(fromUserId && {
          authorId: fromUserId,
        }),
      },
      orderBy: {
        createdAt: "desc",
      },
      ...(pagination && {
        cursor: {
          id: pagination.cursor,
        },
        take: pagination.limit,
      }),
    });

    return {
      success: true,
      data: {
        posts,
        hasMore: posts.length === pagination?.limit,
        finalElementId: posts[posts.length - 1]?.id,
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
