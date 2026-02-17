import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Picture } from "../types";

type PicturesState = {
  pictures: Picture[];
  favorites: Picture[];
  cart: Picture[];
  setPictures: (pictures: Picture[]) => void;
  toggleFavorite: (picture: Picture) => void;
  addToCart: (picture: Picture) => void;
  removeFromCart: (id: string) => void;
};

export const usePicturesStore = create<PicturesState>()(
  persist(
    (set, get) => ({
      pictures: [],
      favorites: [],
      cart: [],

      setPictures: (pictures) => set({ pictures }),

      toggleFavorite: (picture) => {
        const { favorites } = get();
        const isAlreadyFavorite = favorites.some((p) => p.id === picture.id);
        set({
          favorites: isAlreadyFavorite
            ? favorites.filter((p) => p.id !== picture.id)
            : [...favorites, picture],
        });
      },

      addToCart: (picture) => {
        const { cart } = get();
        if (!cart.some((p) => p.id === picture.id)) {
          set({ cart: [...cart, picture] });
        }
      },

      removeFromCart: (id) => {
        set({ cart: get().cart.filter((p) => p.id !== id) });
      },
    }),
    {
      name: "picsum-storage", 
      storage: createJSONStorage(() => localStorage),
    }
  )
);