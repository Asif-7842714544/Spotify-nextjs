"use client";

import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";

const useGetSongById = (id?: string) => {
  const [isLoading, setisLoading] = useState(false);
  const [song, setsong] = useState<Song | undefined>();
  const { supabaseClient } = useSessionContext();
  useEffect(() => {
    if (!id) return;
    setisLoading(true);
    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        setisLoading(false);
        return toast.error(error.message);
      }
      setsong(data as Song);
      setisLoading(false);
    };
    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
};

export default useGetSongById;
