import { useEffect, useMemo, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import supabase from "@/lib/db";
import { Song } from "@/types/types";

const useSongById = (id?: string) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchSong = async () => {
      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setIsLoading(false);
        return toast({ title: error.message, variant: "destructive" });
      }

      setSong(data as unknown as Song);
      setIsLoading(false);
    };

    fetchSong();
  }, [id, supabase]);

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
};

export default useSongById;
