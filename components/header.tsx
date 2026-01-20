"use client";

import { usecart } from '@/hooks/use-cart';
import { navBarData } from '@/lib/data';
import { Minus, MoreVertical, Plus, ShoppingCart, X } from 'lucide-react';
import { Link } from '@/components/links';
import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const {
    open,
    isopen,
    items: cartitem,
    updatequantity,
    removeitem: removefromcart,
    carttotal,
  } = usecart();

  return (
    <header className="sticky top-0 z-10 bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <button className="p-2" onClick={() => setToggle(!toggle)}>
          {toggle ? (
            <X className="h-6 w-6 font-bold" />
          ) : (
            <MoreVertical className="h-6 w-6" />
          )}
          <span className="sr-only">menu</span>
        </button>

        {toggle && (
          <div className="w-full flex gap-x-10 items-center justify-center">
            {navBarData.map((item) => (
              <Link
                key={item.idx}
                href={item.link}
                className="text-lg font-medium text-primary"
              >
                {item.title}
              </Link>
            ))}
          </div>
        )}

        {/* Cart */}
        <Sheet open={open} onOpenChange={isopen}>
          <SheetTrigger asChild>
            <button className="text-lg font-medium flex items-center gap-2">
              <span>Cart</span>
              {cartitem.length > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-black text-white rounded-full">
                  {cartitem.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
          </SheetTrigger>

          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Your cart</SheetTitle>
            </SheetHeader>

            {cartitem.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[50vh]">
                <ShoppingCart className="h-12 w-12 text-gray-300 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-auto p-6">
                  <ul className="space-y-6">  
                    {cartitem.map((item) => (
                      <li key={item.id} className="flex gap-4">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                          <Image
                            src={item.images?.[0]?.src || "/placeholder.svg"}
                            alt={item.name}
                            width={96}
                            height={96}
                            className="h-full w-full object-contain p-2"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">${item.price}</p>
                          </div>

                          <div className="flex items-center mt-2">
                            <button
                              className="rounded-md border p-1"
                              onClick={() =>
                                updatequantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>

                            <span className="mx-2 w-8 text-center">
                              {item.quantity}
                            </span>

                            <button
                              className="rounded-md border p-1"
                              onClick={() =>
                                updatequantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </button>

                            <button
                              className="ml-auto text-gray-400 hover:text-gray-600"
                              onClick={() => removefromcart(item.id)}
                            >
                              <X className="h-5 w-5" />
                              <span className="sr-only">remove</span>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200 p-6">
                  <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                    <p>Subtotal</p>
                    <p>${carttotal}</p>
                  </div>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
