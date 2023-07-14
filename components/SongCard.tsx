"use cleint";

import React from "react";

import { useAppDispatch } from "@/hooks/reduxHooks";
import useLoadImage from "@/hooks/useLoadImage";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import { playPause, setActiveSong } from "@/redux/features/playerSlice";
import { Song } from "@/types/types";
import PlayPause from "./PlayPause";

interface SongCardProps {
  song: Song;
  isPlaying: boolean;
  activeSong: any;
  data: Song[];
  i: number;
}

const SongCard: React.FC<SongCardProps> = ({
  song,
  isPlaying,
  activeSong,
  data,
  i,
}) => {
  const dispatch = useAppDispatch();

  const songUrl = useLoadSongUrl(song);

  const modifiedSong = { ...song, songUrl };

  const imagePath = useLoadImage(song);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ modifiedSong, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song.title
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          alt="song_img"
          src={imagePath || ""}
          className="w-full h-full rounded-lg"
        />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          {song.title}
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">{song.author}</p>
      </div>
    </div>
  );
};

export default SongCard;
