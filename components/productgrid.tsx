"use client";

import { Link } from '@/components/links';
import React from 'react';
import Image from 'next/image';

type Props = {
  product: any[];
  category?: string; // Optional category for routing
  maxColumns?: 4 | 5; // Control max columns
  spacing?: 'normal' | 'large'; // Control gap size
  showContainer?: boolean; // Control if it shows its own container
};

const ProductGrid = ({ 
  product, 
  category, 
  maxColumns = 4, 
  spacing = 'normal',
  showContainer = true 
}: Props) => {
  
  // Function to determine the category for a product
  const getProductCategory = (product: any) => {
    if (category) return category; // Use provided category
    
    // Use the category field from database
    if (product.category) {
      return product.category;
    }
    
    // Fallback to a default category
    return 'products';
  };

  // Dynamic grid classes based on props
  const getGridClasses = () => {
    const baseClasses = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5";
    const gapClasses = spacing === 'large' ? "gap-0" : "gap-0";
    
    return `${baseClasses} ${gapClasses}`;
  };

  const gridContent = (
    <div className={getGridClasses()}>
      {product.map((product, index) => {
        const productCategory = getProductCategory(product);
        
        return (
          <Link
            href={`/${productCategory}/${product.id}`}
            key={index}
            className="flex flex-col group relative"
          >
            <div className="relative aspect-square rounded-md overflow-hidden">
              <Image
                src={product.images?.[0]?.src || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="group-hover:opacity-100 opacity-0 flex flex-col justify-end mt-2 transition-opacity">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-primary truncate">
                  {product.name}
                </h3>
                <p className="text-sm font-semibold text-primary">
                  ${(product.price / 100).toFixed(2)}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );

  // Return with or without container based on showContainer prop
  if (showContainer) {
    return (
      <div className="min-h-screen bg-white">
        <main className="container mx-auto px-4 py-8">
          {gridContent}
        </main>
      </div>
    );
  }

  return gridContent;
};

export default ProductGrid;