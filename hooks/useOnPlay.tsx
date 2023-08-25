import { Song } from "@/types";
import usePlayerStore from "./UsePlayerStrore";
import useAuthModalStore from "./useAuthModal";
import { useUser } from "./useUser";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayerStore();
  const { onClose, onOpen } = useAuthModalStore();
  const { user } = useUser();
  const onPlay = (id: string) => {
    if (!user) {
      return onOpen();
    }
    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };
  return onPlay;
};

export default useOnPlay;
