"use client";

import React from "react";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModalStore from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModalStore from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "./MediaItem";

interface LibraryProps {
  songs: Song[];
}

function Library({ songs }: LibraryProps) {
  const { onClose, onOpen } = useAuthModalStore();
  const uploadModal = useUploadModalStore();

  const { user } = useUser();

  const Upload = () => {
    if (!user) return onOpen();

    //todo:Check for subscriptions
    return uploadModal.onOpen();
  };
  return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-base">Your library</p>
        </div>
        <AiOutlinePlus
          onClick={Upload}
          className="text-neutral-400 cursor-pointer hover:text-white transition duration-300"
          size={22}
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3 ">
        {songs.map((song) => (
          <div key={song.id} className="flex">
            <MediaItem key={song.id} onClick={() => {}} data={song} />
            {/* <LikeButton songId={song.id} /> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Library;
