"use client";

import { ListMusic, Plus } from "lucide-react";

type Props = {};

const Library = (props: Props) => {
  const handleClick = (e: any) => {
    //  TODO: HANDLE UPLOAD SONG
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <ListMusic size={26} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium text-md ">Your Library</p>
        </div>
        <Plus
          onClick={(e) => handleClick(e)}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {/* TODO: List of Songs */}
        List of Songs
      </div>
    </div>
  );
};

export default Library;
