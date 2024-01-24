import { prisma } from "@/libs/prisma";
import NewPlaylist from "./NewPlaylist";
import NewSong from "./NewSong";

export default async function Home() {
  const playlists = await prisma.playlist.findMany({
    include: { songs: true },
  });
  return (
    <main className="p-16 space-y-10">
      <h1 className="3xl">Playlists</h1>
      <ul className="flex gap-4 flex-col">
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            <h2 className="text-3xl">{playlist.name}</h2>
            <p>{playlist.description}</p>
            <ul>
              {playlist.songs.map((song, i) => (
                <li key={song.id}>
                  <h3>
                    {i + 1}. {song.name}
                  </h3>
                  <p className="text-sm font-bold">Artist: {song.artist}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <NewPlaylist />
      <NewSong playlists={playlists} />
    </main>
  );
}
