"use client";

import supabase from "@/lib/db";
import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";

interface LikeButtonProps {
  songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };
    fetchData();
  }, [songId, supabase, user?.id]);

  if (!user) {
    return;
  }

  const handleLike = async () => {
    if (isLiked) {
      const { error } = await supabase
        .from("liked_songs")
        .delete()
        .eq("user_id", user?.id)
        .eq("song_id", songId);

      if (error) {
        toast({
          title: error.message,
          variant: "destructive",
        });
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabase.from("liked_songs").insert({
        song_id: Number(songId),
        user_id: user?.id,
      });

      if (error) {
        toast({
          title: error.message,
          variant: "destructive",
        });
      } else {
        setIsLiked(true);
        toast({
          title: "Liked.",
        });
      }
    }

    router.refresh();
  };

  return (
    <button
      className="
        cursor-pointer 
        hover:opacity-75 
        transition
      "
      onClick={handleLike}
    >
      <Heart
        fill={isLiked ? "#22c55e" : ""}
        color={isLiked ? "#22c55e" : "white"}
        size={25}
      />
    </button>
  );
};

export default LikeButton;
