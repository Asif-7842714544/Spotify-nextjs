import { create } from "zustand";

interface AuthModalStrore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAuthModalStore = create<AuthModalStrore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAuthModalStore;
