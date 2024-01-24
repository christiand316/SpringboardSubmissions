"use server";
import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function getUserSession() {
  try {
    const cookieToken = cookies().get("token");
    if (!cookieToken) {
      return null;
    }
    const token = jwt.verify(
      cookieToken.value,
      process.env.JWT_SECRET
    ) as jwt.JwtPayload;

    if (!token) {
      return null;
    }

    const user = (await prisma.user.findUnique({
      where: { id: token.id },
      select: { name: true, email: true, id: true },
    }))!;

    return user;
  } catch (error) {
    return null;
  }
}
