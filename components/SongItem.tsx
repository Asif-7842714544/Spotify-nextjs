"use client";
import useLoadImage from "@/hooks/useLoadingImage";
import { Song } from "@/types";
import Image from "next/image";
import React from "react";
import { FaPlay } from "react-icons/fa";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

function SongItem({ data, onClick }: SongItemProps) {
  const imagePath = useLoadImage(data);
  return (
    <div
      onClick={() => onClick(data.id)}
      className="relative group flex flex-col items-center justify-center rounded-md
            overflow-hidden gap-x-4 bg-neutral-400/40 cursor-pointer hover:bg-neutral-400/10
            transition duration-300 p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden ">
        <Image
          className="object-cover"
          src={imagePath || "/images/R.png"}
          fill
          alt=""
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full ">{data.title}</p>
        <p className="text-neutral-400 text-sm pb-4 truncate w-full ">
          By {data.author}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">
        <button
          className="transition duration-200 opacity-0 rounded-full flex items-center 
        bg-green-500 p-4 drop-shadow-md translate-y-1/4 group-hover:opacity-100
         group-hover:translate-y-0 hover:scale-110 "
        >
          <FaPlay className="text-black" />
        </button>
      </div>
    </div>
  );
}

export default SongItem;
