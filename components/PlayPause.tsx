import { Track } from "@/types/song";
import { PauseCircle, PlayCircle } from "lucide-react";
import React from "react";

interface PlayPauseProps {
  song: Track;
  isPlaying: boolean;
  activeSong: any;
  handlePause: () => void;
  handlePlay: () => void;
}

const PlayPause: React.FC<PlayPauseProps> = ({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
}) =>
  isPlaying && activeSong?.title === song.title ? (
    <PauseCircle size={35} className="text-gray-300" onClick={handlePause} />
  ) : (
    <PlayCircle size={35} className="text-gray-300" onClick={handlePlay} />
  );

export default PlayPause;
