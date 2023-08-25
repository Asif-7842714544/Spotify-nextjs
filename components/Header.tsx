"use client";

import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import useAuthModalStore from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

function Header({ children, className }: HeaderProps) {
  const { onOpen, onClose } = useAuthModalStore();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    //Todo : Resest any playing Songs
    router.refresh();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("LogedOut successfully");
    }
  };

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6 `,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between ">
        <div className="hidden md:flex gap-x-2 items-center">
          <button className="rounded-full bg-black flex items-center justify-center hover:opacity-60 ">
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button className="rounded-full bg-black flex items-center justify-center hover:opacity-60 ">
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center ">
          <button className="rounded-full bg-white p-2 flex items-center justify-center hover:opacity-60 transition duration-300">
            <HiHome className="text-black" size={22} />
          </button>
          <button className="rounded-full bg-white p-2 flex items-center justify-center hover:opacity-60 transition duration-300">
            <BiSearch className="text-black" size={22} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {/* login buttons */}

          {user ? (
            <div className="flex gap-x-4 items-center ">
              <button
                onClick={handleLogOut}
                className="bg-white px-6 py-2 hover:opacity-70 rounded-full text-black"
              >
                LogOut
              </button>
              <div className="  ">
                <FaUserAlt size={22} />
              </div>
            </div>
          ) : (
            <>
              <div>
                <button
                  onClick={onOpen}
                  className="w-full rounded-full bg-gray-500 border border-transparent
                    p-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition"
                >
                  Signup
                </button>
              </div>
              <div>
                <button
                  onClick={onOpen}
                  className="w-full rounded-full bg-white border border-transparent
           p-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition"
                >
                  Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

export default Header;
