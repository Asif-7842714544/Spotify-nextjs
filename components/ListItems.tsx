"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import heart from "@/public/images/heart.png";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";

interface ListItemsProps {
  image: string;
  name: string;
  href: string;
}

function ListItems({ image, name, href }: ListItemsProps) {
  const router = useRouter();
  return (
    <Link href={href}>
      <button
        className="relative group flex items-center rounded-md overflow-hidden
    gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4 
    "
      >
        <div className="relative min-h-[64px] min-w-[64px] ">
          <Image src={image} fill alt="" className="object-cover" />
        </div>
        <p className="font-medium truncate py-5  ">{name}</p>
        <div
          className="absolute transition opacity-0 rounded-full items-center justify-center bg-green-500 p-4 
      drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110 "
        >
          <FaPlay className="text-black" />
        </div>
      </button>
    </Link>
  );
}

export default ListItems;
