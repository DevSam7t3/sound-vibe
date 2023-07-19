import { cn } from "@/lib/utils";

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    <div
      className={cn(
        "sm:block mr-4",
        isPlaying && isActive
          ? "animate-spin animate-duration-[10s] animate-infinite"
          : ""
      )}
    >
      <img
        src={activeSong?.imageUrl}
        alt="cover art"
        className=" rounded-full object-cover w-10 h-10 mr-4"
      />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.title ? activeSong?.title : "No active Song"}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.author ? activeSong?.author : "No active Song"}
      </p>
    </div>
  </div>
);

export default Track;
