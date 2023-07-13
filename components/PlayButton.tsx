import { Play } from "lucide-react";

const PlayButton = () => {
  return (
    <button
      className="
        transition 
        opacity-0 
        rounded-full 
        flex 
        items-center 
        justify-center 
        bg-green-500 
        p-3
        drop-shadow-md 
        translate
        translate-y-1/4
        group-hover:opacity-100 
        group-hover:translate-y-0
        hover:scale-110
      "
    >
      <Play className="text-black fill-black" />
    </button>
  );
};

export default PlayButton;
