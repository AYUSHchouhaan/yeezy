"use server"

import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getproduct() {
  try {
    const allProducts = await db.select().from(products);
    return allProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export const getProduct = async (id: string) => {
  try {
    const productId = parseInt(id);
    const product = await db.select().from(products).where(eq(products.id, productId));
    
    // Always return a product - if not found, return a default product
    if (product[0]) {
      return product[0];
    }
    
    // Return a default product if not found  
    return {
      id: productId,
      name: 'Product Not Available',
      description: 'This product is currently not available.',
      price: 0,
      category: 'general',
      images: [{ src: 'https://via.placeholder.com/600x600/ccc/666?text=No+Image', alt: 'No Image Available' }],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    // Return a default product on error
    return {
      id: parseInt(id),
      name: 'Product Not Available',
      description: 'This product is currently not available.',
      price: 0,
      category: 'general',
      images: [{ src: 'https://via.placeholder.com/600x600/ccc/666?text=No+Image', alt: 'No Image Available' }],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
};

export async function getCategories() {
  try {
    const allCategories = await db.select().from(categories);
    return allCategories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getProductsByCategory(categorySlug: string) {
  try {
    const categoryProducts = await db.select().from(products).where(eq(products.category, categorySlug));
    return categoryProducts;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}