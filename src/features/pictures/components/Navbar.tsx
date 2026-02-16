import Link from 'next/link';
import { Heart, ShoppingCart, Home } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:text-blue-600 transition-colors">
          <Home size={24} />
          <span>PicSum</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/favorites" className="group relative p-2">
            <Heart className="text-gray-600 transition-colors group-hover:text-red-500" size={26} />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              0
            </span>
          </Link>

          <Link href="/store" className="group relative p-2">
            <ShoppingCart className="text-gray-600 transition-colors group-hover:text-blue-600" size={26} />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
              0
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}