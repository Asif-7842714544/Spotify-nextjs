"use client";
import usePlayerStore from "@/hooks/UsePlayerStrore";
import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import React from "react";
import PlayerContent from "./PlayerContent";

function Player() {
  const player = usePlayerStore();
  const { song } = useGetSongById(player.activeId);
  const songUrl = useLoadSongUrl(song!);

  if (!songUrl || !song || !player.activeId) return null;

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
}

export default Player;
