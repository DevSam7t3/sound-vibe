"use client";

import supabase from "@/lib/db";
import { Song } from "@/types/types";
import { useUser } from "@clerk/nextjs";
import { ListMusic, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import uniqid from "uniqid";
import MediaItem from "./MediaItem";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";

interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { isSignedIn, user, isLoaded } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values, event) => {
    event!.preventDefault();
    try {
      console.log("started");

      setLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast({
          title: "Missing Fields",
          description: "All fields are required",
          variant: "destructive",
        });
        return;
      }
      // upload song
      const uniqueId = uniqid();
      const { data: songData, error: songError } = await supabase.storage
        .from("songs")
        .upload(
          `song-${values.title.replace(" ", "-").toLowerCase()}-${uniqueId}`,
          songFile,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );

      if (songError) {
        setLoading(false);
        return toast({
          title: "Failed To Upload",
          description: "Failed to upload song please try again",
          variant: "destructive",
        });
      }

      // upload image
      const { data: imageData, error: imageError } = await supabase.storage
        .from("images")
        .upload(
          `image-${values.title.replace(" ", "-").toLowerCase()}-${uniqueId}`,
          imageFile,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );

      if (imageError) {
        setLoading(false);
        return toast({
          title: "Failed To Upload",
          description: "Failed to upload image please try again",
          variant: "destructive",
        });
      }

      // add to database
      const { error: supabaseError } = await supabase.from("songs").insert({
        user_id: user?.id,
        title: values.title,
        author: values.author,
        image_path: imageData.path,
        song_path: songData.path,
      });

      if (supabaseError) {
        setLoading(false);
        return toast({
          title: supabaseError.message,
          variant: "destructive",
        });
      }

      router.refresh();
      setLoading(false);
      toast({
        title: "song uploaded",
      });
      reset();
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <ListMusic size={26} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium text-md ">Your Library</p>
        </div>

        {/* modal for uploading songs  */}
        <Dialog>
          <DialogTrigger asChild>
            <Plus
              size={20}
              className="text-neutral-400 cursor-pointer hover:text-white transition"
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Song</DialogTitle>
              <DialogDescription>Upload an .mp3 file</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    {...register("title", { required: true })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="author" className="text-right">
                    Author
                  </Label>
                  <Input
                    id="author"
                    {...register("author", { required: true })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="song" className="text-right">
                    Song
                  </Label>
                  <Input
                    accept=".mp3"
                    type="file"
                    id="song"
                    {...register("song", { required: true })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Image
                  </Label>
                  <Input
                    accept="image/*"
                    type="file"
                    id="image"
                    {...register("image", { required: true })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button isLoading={loading} type="submit">
                  Upload
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((item) => (
          <MediaItem onClick={() => {}} key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Library;
