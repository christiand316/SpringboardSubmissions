"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";

export async function createPlaylist(data: {
  name: string;
  description: string;
}) {
  try {
    const playlist = await prisma.playlist.create({ data });
    revalidatePath("/");
    return { success: { data: playlist } };
  } catch (error) {
    console.error(error);
  }
}

export async function createSong(data: {
  name: string;
  artist: string;
  playlistId: number;
}) {
  try {
    const song = await prisma.song.create({
      data: {
        name: data.name,
        artist: data.artist,
        playlist: { connect: { id: data.playlistId } },
      },
    });
    revalidatePath("/");

    return { success: { data: song } };
  } catch (error) {
    console.error(error);
  }
}
