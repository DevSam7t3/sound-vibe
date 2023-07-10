"use client";

import SongCard from "@/components/SongCard";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useGetSongsBySearchQuery } from "@/redux/services/getData";
import { useParams } from "next/navigation";

// import { Error, Loader, SongCard } from "../components";
// import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useAppSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  const songs = data?.tracks?.hits.map((song: any) => song.track);

  if (isFetching) return <h1>Loading.....</h1>;

  if (error) return <h1>Error occured</h1>;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
