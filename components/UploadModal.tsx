import { ErrorMessage } from "@hookform/error-message";
import { Plus } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import uniqid from "uniqid";

import supabase from "@/lib/db";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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

const UploadModal: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();

  const onSubmit: SubmitHandler<FieldValues> = async (values, event) => {
    event!.preventDefault();
    try {
      let imageUploadedUrl;
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!songFile || !user) {
        // toast({
        //   title: "Missing Fields",
        //   description: "All fields are required",
        //   variant: "destructive",
        // });
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
        return toast({
          title: "Failed To Upload",
          description: "Failed to upload song please try again",
          variant: "destructive",
        });
      }

      // upload image
      if (imageFile) {
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
        imageUploadedUrl = imageData?.path;

        if (imageError) {
          return toast({
            title: "Failed To Upload",
            description: "Failed to upload image please try again",
            variant: "destructive",
          });
        }
      }

      // add to database
      const { error: supabaseError } = await supabase.from("songs").insert({
        user_id: user?.id,
        title: values.title,
        author: values.author,
        image_path: imageUploadedUrl,
        song_path: songData.path,
      });

      if (supabaseError) {
        return toast({
          title: supabaseError.message,
          variant: "destructive",
        });
      }

      router.refresh();
      toast({
        title: "song uploaded",
      });
      reset();
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Plus
          size={20}
          className="text-black md:text-neutral-400 cursor-pointer md:hover:text-white transition"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Song</DialogTitle>
          <DialogDescription>Upload an .mp3 file</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {/* title field */}
            <div className="flex flex-col justify-center items-start">
              <div className="flex items-center">
                <Label htmlFor="title" className="mr-5">
                  Title
                </Label>
                <ErrorMessage
                  errors={errors}
                  name="title"
                  render={({ message }) => (
                    <p className="text-red-600 text-sm">({message})</p>
                  )}
                />
              </div>
              <Input
                id="title"
                {...register("title", { required: "Title is required." })}
                className="col-span-3"
              />
            </div>
            {/* author field */}
            <div className="flex flex-col justify-center items-start">
              <div className="flex items-center">
                <Label htmlFor="author" className="mr-5">
                  Author
                </Label>
                <ErrorMessage
                  errors={errors}
                  name="author"
                  render={({ message }) => (
                    <p className="text-red-600 text-sm">({message})</p>
                  )}
                />
              </div>
              <Input
                id="author"
                {...register("author", { required: "Author is required." })}
                className="flex-1"
              />
            </div>
            {/* song field */}
            <div className="flex flex-col justify-center items-start">
              <div className="flex items-center">
                <Label htmlFor="song" className="mr-5">
                  Song
                </Label>
                <ErrorMessage
                  errors={errors}
                  name="song"
                  render={({ message }) => (
                    <p className="text-red-600 text-sm">({message})</p>
                  )}
                />
              </div>
              <Input
                accept=".mp3"
                type="file"
                id="song"
                {...register("song", { required: "Song is required." })}
                className="col-span-3"
              />
            </div>
            {/* image field */}
            <div className="flex flex-col justify-center items-start">
              <div>
                <Label htmlFor="image" className="mr-1">
                  Image
                </Label>
                <span className="text-sm text-gray-500">(optional)</span>
              </div>
              <Input
                accept="image/*"
                type="file"
                id="image"
                {...register("image")}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button isLoading={isSubmitting} type="submit">
              Upload
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
