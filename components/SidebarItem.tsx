import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

function SidebarItem({ icon: Icon, active, label, href }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex flow-row h-auto items-center w-full gap-x-4
         text-md font-medium cursor-pointer hover:text-white
         transition duration-300 text-neutral-400 py-1`,
        active && "text-white"
      )}
    >
      <Icon size={24} />
      <p className="truncate w-full">{label}</p>
    </Link>
  );
}

export default SidebarItem;
