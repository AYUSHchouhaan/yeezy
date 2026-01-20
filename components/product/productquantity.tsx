'use client';

import { usecart } from '@/hooks/use-cart';
import React from 'react';

type Props = {
    product: any;
};



const ProductQuantity = ({ product }: Props) => {

    const {
        open,
        isopen,
        items: cartitem,
        updatequantity,
        additem:addtocart,
        removeitem: removefromcart,
        carttotal,
    } = usecart();

    const currProductQuantity = cartitem.find(item => item.id === product.id)?.quantity || 0;

    const handleProduct = (quantity: number) => {
        const findProduct = cartitem.find((item) => item.id === product.id);
        if (findProduct) {
            updatequantity(product.id, quantity);
        } else {
            addtocart(product);
        }
    };

    return (
        <div className="flex items-center space-x-4">
            <button
                onClick={() => handleProduct(Math.max(1, currProductQuantity - 1))}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 font-medium"
            >
                −
            </button>
            <input
                type="number"
                min="0"
                max="100"
                value={currProductQuantity}
                onChange={(e) => handleProduct(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-16 px-3 py-2 border border-gray-300 rounded-md text-center font-medium"
            />
            <button
                onClick={() => handleProduct(currProductQuantity + 1)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 font-medium"
            >
                +
            </button>
        </div>
    );
};

export default ProductQuantity;