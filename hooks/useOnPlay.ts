import { Song } from "@/types/types";

import { useUser } from "@clerk/nextjs";
import usePlayer from "./usePlayer";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return;
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
