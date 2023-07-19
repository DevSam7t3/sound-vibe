"use client";

import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import {
  nextSong,
  playPause,
  prevSong,
} from "../../redux/features/playerSlice";
import Controls from "./Controls";
import Player from "./Player";
import Seekbar from "./Seekbar";
import Track from "./Track";
import VolumeBar from "./VolumeBar";

const MusicPlayer = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useAppSelector((state) => state.player);

  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentSongs.length) dispatch(playPause(true));
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  return (
    <>
      {activeSong?.title && (
        <div className=" absolute h-28 bottom-0 left-0 right-0 flex animate-slideup backdrop-blur-lg bg-emerald-500/10  rounded-t-3xl z-10">
          <div className="sm:px-12 px-8 w-full flex items-center justify-between">
            <Track
              isPlaying={isPlaying}
              isActive={isActive}
              activeSong={activeSong}
            />
            <div className="flex-1 flex flex-col items-center justify-center">
              <Controls
                isPlaying={isPlaying}
                isActive={isActive}
                repeat={repeat}
                setRepeat={setRepeat}
                shuffle={shuffle}
                setShuffle={setShuffle}
                currentSongs={currentSongs}
                handlePlayPause={handlePlayPause}
                handlePrevSong={handlePrevSong}
                handleNextSong={handleNextSong}
              />
              <Seekbar
                value={appTime}
                min="0"
                max={duration}
                onInput={(event) => setSeekTime(event.target.value)}
                setSeekTime={setSeekTime}
                appTime={appTime}
              />
              <Player
                activeSong={activeSong}
                volume={volume}
                isPlaying={isPlaying}
                seekTime={seekTime}
                repeat={repeat}
                currentIndex={currentIndex}
                onEnded={handleNextSong}
                onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
                onLoadedData={(event) => setDuration(event.target.duration)}
              />
            </div>
            <VolumeBar
              value={volume}
              min="0"
              max="1"
              onChange={(event) => setVolume(event.target.value)}
              setVolume={setVolume}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
