"use client";

import { createPlaylist, createSong } from "@/libs/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3),
  artist: z.string().min(3),
  playlistId: z.string(),
});

export default function NewSong({
  playlists,
}: {
  playlists: { id: number; name: string }[];
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const result = await createSong({
      name: data.name,
      artist: data.artist,
      playlistId: parseInt(data.playlistId),
    });
    console.log(result);
    reset();
  });

  return (
    <div className="border p-4 max-w-sm">
      <h2 className="text-lg">New playlist</h2>
      <form
        className="text-slate-500 flex flex-col gap-6  "
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap">
          <label htmlFor="name">Name</label>
          <input id="name" {...register("name")} required />
          {errors.name && (
            <div>
              {errors.name.message || "Name needs to be least 3 characters"}
            </div>
          )}
        </div>
        <div className="flex flex-col gap">
          <label htmlFor="artist">Artist</label>
          <input id="artist" {...register("artist")} required />
          {errors.artist && (
            <div>
              {errors.artist.message || "Artist needs to be least 3 characters"}
            </div>
          )}
        </div>
        <div className="flex flex-col gap">
          <label htmlFor="playlistId">Playlist</label>
          <select {...register("playlistId")}>
            {playlists.map((playlist) => {
              return (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.id}#{playlist.name}
                </option>
              );
            })}
          </select>
          {errors.playlistId && (
            <div>
              {errors.playlistId.message ||
                "playlistId needs to be least 3 characters"}
            </div>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
