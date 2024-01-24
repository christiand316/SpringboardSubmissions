"use server";
import { prisma } from "@/lib/prisma";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function invalidateToken() {
  try {
    const cookieToken = cookies().get("token");
    if (!cookieToken) {
      return null;
    }
    const token = jwt.verify(
      cookieToken.value,
      process.env.JWT_SECRET
    ) as jwt.JwtPayload;

    await prisma.invalidatedTokens.create({
      data: { token: token.jti as string },
    });

    cookies().delete("token");
    return null;
  } catch (error) {
    return null;
  }
}
