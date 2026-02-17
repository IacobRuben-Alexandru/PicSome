"use client";

import { Heart, Plus } from "lucide-react";
import { Picture } from "../types";
import { usePicturesStore } from "@/features/pictures/store/picturesStore";

export default function PictureCard({ picture }: { picture: Picture }) {
  const toggleFavorite = usePicturesStore((s) => s.toggleFavorite);
  const addToCart = usePicturesStore((s) => s.addToCart);
  
  const isFavorite = usePicturesStore((s) => 
    s.favorites.some((p) => p.id === picture.id)
  );

  return (
    <div className="group relative mb-4 break-inside-avoid overflow-hidden rounded-xl">
      <img
        src={picture.download_url}
        alt={picture.author}
        className="w-full transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 hidden bg-black/40 group-hover:block transition-all">
        <button
          onClick={() => toggleFavorite(picture)}
          className="absolute left-3 top-3 p-2 transition-transform hover:scale-110 active:scale-90"
        >
          <Heart
            size={28}
            className={`transition-colors ${
              isFavorite ? "fill-red-500 text-red-500" : "text-white"
            }`}
          />
        </button>

        <button 
          onClick={() => addToCart(picture)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-lg transition-colors hover:bg-gray-200 active:scale-90"
        >
          <Plus size={22} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}