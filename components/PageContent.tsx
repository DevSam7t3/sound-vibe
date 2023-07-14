"use client";

// import useOnPlay from "@/hooks/useOnPlay";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { Song } from "@/types/types";
import SongCard from "./SongCard";

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const dispatch = useAppDispatch();

  const { genreListId } = useAppSelector((state) => state.player);
  const { activeSong, isPlaying } = useAppSelector((state) => state.player);

  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available.</div>;
  }

  return (
    <div
      className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        2xl:grid-cols-8 
        gap-4 
        mt-4
      "
    >
      {songs.map((item, i) => (
        <SongCard
          key={item.id}
          data={songs}
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={item}
          i={i}
        />
      ))}
    </div>
  );
};

export default PageContent;
