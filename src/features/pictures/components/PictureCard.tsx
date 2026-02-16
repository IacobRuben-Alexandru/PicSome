"use client";

import { useState } from "react";
import { Heart, Plus } from "lucide-react";
import { Picture } from "../types";

export default function PictureCard({ picture }: { picture: Picture }) {
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <div className="group relative mb-4 break-inside-avoid">
      <img
        src={picture.download_url}
        alt={picture.author}
        className="w-full rounded-xl"
      />

        <div className="absolute inset-0 hidden group-hover:block bg-black/40">
            <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute left-3 top-3 p-2 transition-transform hover:scale-110 active:scale-90"
                >
                <Heart 
                    size={28} 
                    className={`transition-colors ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-white"
                    }`} 
                />
            </button>

            <button className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-gray-200">
                <Plus size={20} strokeWidth={2.5} />
            </button>
        </div>
    </div>
  );
}
