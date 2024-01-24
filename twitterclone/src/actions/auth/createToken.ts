"use server";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function createToken(userId: number) {
  try {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
    cookies().set("token", token, { secure: true, httpOnly: true });
    return token;
  } catch (error) {
    return null;
  }
}
