"use client";

import { Cartcontext } from "@/providers/cart-context";
import { useContext } from "react";

export function usecart(){
    const context = useContext(Cartcontext);


    if (!context) {
        throw new Error("usecart must be used within a CartProvider");
    }
    return context;
}   