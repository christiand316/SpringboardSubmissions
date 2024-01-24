"use server";
import { prisma } from "@/lib/prisma";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { BadResponse, GoodResponse } from "./userUtil";

export async function signoutUser() {
  try {
    const cookieToken = cookies().get("token");
    if (!cookieToken) {
      return {
        success: false,
        error: {
          type: "notFound",
          message: "Token not found",
        },
      } satisfies BadResponse;
    }
    const token = jwt.verify(
      cookieToken.value,
      process.env.JWT_SECRET
    ) as jwt.JwtPayload;

    cookies().delete("token");
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
