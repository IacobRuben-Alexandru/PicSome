"use client"; 

import Link from 'next/link';
import { Heart, ShoppingCart, Home } from 'lucide-react';
import { usePicturesStore } from "@/features/pictures/store/picturesStore";
import { useIsMounted } from '@/hooks/useIsMounted';

export default function Navbar() {
    const isMounted = useIsMounted();
    const favoritesCount = usePicturesStore((s) => s.favorites.length);
    const cartCount = usePicturesStore((s) => s.cart.length);
    
    if (!isMounted) {
        return (
            <nav className="fixed top-0 z-50 w-full border-b backdrop-blur-md"></nav>
        );
    }
    return (
        <nav className="fixed top-0 z-50 w-full border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-[98%] items-center justify-between px-6 py-4">
            <Link 
            href="/" 
            className="flex items-center gap-2 font-bold text-xl text-[#7D5233] hover:text-[#5D2906] transition-colors duration-300"
            >
            <Home size={24} />
            <span>PicSum</span>
            </Link>

            <div className="flex items-center gap-6">
            <Link href="/favorites" className="group relative p-2">
                <Heart 
                className={`transition-colors ${favoritesCount > 0 ? 'text-red-500 fill-red-500' : 'text-gray-600 group-hover:text-red-500'}`} 
                size={26} 
                />
                {favoritesCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 animate-in zoom-in items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {favoritesCount}
                </span>
                )}
            </Link>

            <Link href="/store" className="group relative p-2">
                <ShoppingCart className="text-gray-600 transition-colors group-hover:text-blue-600" size={26} />
                {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 animate-in zoom-in items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                    {cartCount}
                </span>
                )}
                
            </Link>
            </div>
        </div>
        </nav>
    );
}