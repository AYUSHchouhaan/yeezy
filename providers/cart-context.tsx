'use client'

import { add, previousDay, set } from "date-fns";
import { useState, createContext, useCallback } from "react";
import React from "react";

type props = {
  children: React.ReactNode;
};

interface cartitem {
  id: string
  name: string
  price: number
  quantity: number
  images: {
    src: string
  }[]
}

interface Cartcontexttype {
  items: cartitem[]
  additem: (product: string) => void
  removeitem: (productid: string) => void
  updatequantity: (productid: string, quantity: number) => void
  clearcart: () => void
  open: boolean
  isopen: (open: boolean) => void
  carttotal: number
}



export const Cartcontext = createContext<Cartcontexttype | undefined>(undefined)



const CartProvider = ({ children }: props) => {

  const [items, setItem] = useState<cartitem[]>([]);
  const [open, isOpen] = useState(false);

  const additem = useCallback((product: any) => {
    setItem((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
    isOpen(true);
  }, []);

  const removeitem = useCallback((productid: string) => {
    setItem((prevItems) => prevItems.filter((item) => item.id !== productid));
  }, []);

  const updatequantity = useCallback((productId: string, quantity: number) => {

    if (quantity < 1) {
      removeitem(productId);
      return;
    }

    setItem((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearcart = useCallback(() => {
    setItem([]);
  }, []);


  const carttotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Cartcontext.Provider value={{ items, additem, removeitem, updatequantity ,clearcart, open, isopen:isOpen,carttotal}}>
      {children}
    </Cartcontext.Provider>
  );
}

export default CartProvider;