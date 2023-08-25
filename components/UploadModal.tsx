"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import useUploadModalStore from "@/hooks/useUploadModal";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

function UploadModal() {
  const [isLoading, setisLoading] = useState(false);
  const { onClose, onOpen, isOpen } = useUploadModalStore();
  const router = useRouter();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  };

  const uploadSongs: SubmitHandler<FieldValues> = async (values) => {
    try {
      setisLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
      if (!imageFile || !songFile || !user) {
        toast.error("Missing Fields");
        return;
      }

      const uniqId = uniqid();
      //uploading song file
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqId}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (songError) {
        setisLoading(false);
        return toast.error("Failed Song uploading");
      }

      //uploadinng image file
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqId}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (imageError) {
        setisLoading(false);
        return toast.error("Failed image uploading");
      }
      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });
      if (supabaseError) {
        setisLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setisLoading(false);
      toast.success("Song created successfully");
      reset();
      onClose();
    } catch (error) {
      toast.error("something is Wrong");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      title="Add a Songs "
      description="Upload an mp3 file"
    >
      <form
        className="flex flex-col gap-y-3"
        onSubmit={handleSubmit(uploadSongs)}
      >
        <input
          type="text"
          id="title"
          disabled={isLoading}
          placeholder="Add Song title"
          {...register("title", { required: true })}
          className="focus:outline-none flex w-full rounded-md
           bg-neutral-700 border border-transparent p-3 text-sm file:border-0 
            placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 "
        />
        <input
          type="text"
          id="author"
          disabled={isLoading}
          placeholder="Add Song Author"
          {...register("author", { required: true })}
          className="focus:outline-none flex w-full rounded-md
           bg-neutral-700 border border-transparent p-3 text-sm file:border-0 
            placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 "
        />
        <div>
          <div className="pb-1">Select a Song</div>
          <input
            type="file"
            id="song"
            accept=".mp3"
            disabled={isLoading}
            placeholder="Add Song title"
            {...register("song", { required: true })}
            className="focus:outline-none flex w-full rounded-md
           bg-neutral-700 border border-transparent p-3 text-sm file:border-0 
            placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 "
          />
          <div className="pb-1">Select an image</div>

          <input
            type="file"
            id="image"
            accept="image/*"
            disabled={isLoading}
            placeholder="Add Song title"
            {...register("image", { required: true })}
            className="focus:outline-none flex w-full rounded-md
         bg-neutral-700 border border-transparent p-3 text-sm file:border-0 
          placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 "
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-green-600 border border-transparent
           p-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition"
        >
          Create
        </button>
      </form>
    </Modal>
  );
}

export default UploadModal;
