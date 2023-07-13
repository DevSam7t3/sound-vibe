import supabase from "@/lib/db";
import { Song } from "@/types/types";

const useLoadImage = (song: Song) => {
  if (!song) {
    return null;
  }

  const { data: imageData } = supabase.storage
    .from("images")
    .getPublicUrl(song.image_path);

  return imageData.publicUrl;
};

export default useLoadImage;
