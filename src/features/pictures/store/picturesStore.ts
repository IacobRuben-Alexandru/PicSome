import { create } from "zustand";
import { Picture } from "../types";

type PicturesState = {
  pictures: Picture[];
  setPictures: (pictures: Picture[]) => void;
};

export const usePicturesStore = create<PicturesState>((set) => ({
  pictures: [],
  setPictures: (pictures) => set({ pictures }),
}));
