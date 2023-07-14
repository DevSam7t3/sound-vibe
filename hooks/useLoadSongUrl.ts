import supabase from "@/lib/db";
import { Song } from "@/types/types";

const useLoadSongUrl = (song: Song) => {
  if (!song) {
    return "";
  }

  const { data: songData } = supabase.storage
    .from("songs")
    .getPublicUrl(song.song_path);

  return songData.publicUrl;
};

export default useLoadSongUrl;
