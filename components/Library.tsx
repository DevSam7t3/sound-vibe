"use client";

import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types/types";
import { ListMusic } from "lucide-react";
import { useState } from "react";

import MediaItem from "./MediaItem";
import UploadModal from "./UploadModal";

interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <ListMusic size={26} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium text-md ">Your Library</p>
        </div>

        {/* modal for uploading songs  */}
        <UploadModal loading={loading} setLoading={setLoading} />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((item) => (
          <MediaItem
            onClick={(id: string) => onPlay(id)}
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
