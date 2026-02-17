"use client";

import { useState, useEffect } from "react";
import { usePicturesStore } from "@/features/pictures/store/picturesStore";
import { Trash2, ShoppingBag, CheckCircle2, Loader2 } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import Link from "next/link";

export default function StorePage() {
    const cart = usePicturesStore((s) => s.cart);
    const removeFromCart = usePicturesStore((s) => s.removeFromCart);
    const setStore = usePicturesStore.setState; 
    const isMounted = useIsMounted();
    
    const [isOrdering, setIsOrdering] = useState(false);
    const [isOrdered, setIsOrdered] = useState(false);

    const calculatePrice = (width: number, height: number) => {
        const area = width * height;
        
        const basePrice = 5;
        const pixelSurcharge = area / 1000000; 
        
        const finalPrice = basePrice + pixelSurcharge;
        
        return Math.round(finalPrice * 100) / 100;
    };

    const totalPrice = cart.reduce((acc, pic) => {
        return Math.round((acc + calculatePrice(pic.width, pic.height)) * 100) / 100;

    }, 0);

    const handlePlaceOrder = () => {
        setIsOrdering(true);
        setTimeout(() => {
            setIsOrdering(false);
            setIsOrdered(true);
            setStore({ cart: [] });
        }, 2000);
    };

    if (!isMounted) return null;

    if (isOrdered) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
            <CheckCircle2 size={80} className="text-green-500 mb-4" />
            <h1 className="text-3xl font-bold">Thank you for your purchase!</h1>
            <p className="text-gray-500 mt-2">Your order has been placed successfully.</p>
            
            <Link 
                href="/" 
                className="mt-6 inline-block rounded-lg bg-[#7D5233] px-6 py-2 text-white font-medium hover:bg-blue-700 transition-colors"
            >
                Return to Shop
            </Link>
        </div>
    );
}

    return (
        <div className="container mx-auto max-w-4xl p-6">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3 text-[#7D5233]">
                Checkout <ShoppingBag className="text-[#7D5233]" />
            </h1>

            {cart.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
                    <p className="text-gray-500">Your store list is empty.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                        {cart.map((pic, index) => {
                            const itemPrice = calculatePrice(pic.width, pic.height);
                            
                            return (
                                <div 
                                    key={pic.id} 
                                    className={`flex items-center justify-between p-4 ${
                                        index !== cart.length - 1 ? "border-b" : ""
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <img 
                                            src={pic.download_url} 
                                            alt={pic.author} 
                                            className="h-20 w-20 object-cover rounded-lg"
                                        />
                                        <div>
                                            <h3 className="text-black font-semibold text-lg">Photo by {pic.author}</h3>
                                            <p className="text-sm text-gray-400">Size: {pic.width} x {pic.height}</p>
                                            <p className="text-[#7D5233] font-bold">{itemPrice} €</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(pic.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                        title="Remove item"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <p className="text-gray-600">Total Amount:</p>
                            <p className="text-3xl font-black text-gray-900">{totalPrice} €</p>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={isOrdering}
                            className="w-full md:w-auto px-10 py-4 bg-[#7D5233] text-white font-bold rounded-xl shadow-lg shadow-[#5D2906] hover:bg-[#5D2906] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isOrdering ? (
                                <>
                                    <Loader2 className="animate-spin" /> Processing...
                                </>
                            ) : (
                                "Place Order"
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}