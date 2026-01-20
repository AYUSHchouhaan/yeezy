import { cookies } from "next/headers";
import { verifyToken } from "./session.js";
import {
  categories,
  products,
  users,
} from "@/db/schema";
import { db } from "@/db";
import { eq, and, count, like, or } from "drizzle-orm";
import { sql } from "drizzle-orm";

export async function getUser() {
  const sessionCookie = (await cookies()).get("session");
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  const sessionData = await verifyToken(sessionCookie.value);
  if (
    !sessionData ||
    !sessionData.user ||
    typeof sessionData.user.id !== "number"
  ) {
    return null;
  }

  if (new Date(sessionData.expires) < new Date()) {
    return null;
  }

  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.id, sessionData.user.id)))
    .limit(1);

  if (user.length === 0) {
    return null;
  }

  return user[0];
}

export async function getAllProducts() {
  return await db
    .select()
    .from(products)
    .orderBy(products.createdAt);
}

export async function getAllCategories() {
  try {
    return await db.select().from(categories);
  } catch (error) {
    console.error('Error fetching all categories:', error);
    return [];
  }
}

export async function getProductImagesByCategory(categorySlug: string) {
  try {
    const categoryProducts = await db
      .select({ 
        id: products.id, 
        name: products.name, 
        images: products.images,
        category: products.category 
      })
      .from(products)
      .where(eq(products.category, categorySlug));
    
    return categoryProducts;
  } catch (error) {
    console.error('Error fetching product images by category:', error);
    return [];
  }
}

export async function getProductWithImages(id: number) {
  try {
    const product = await db
      .select({
        id: products.id,
        name: products.name,
        images: products.images,
        category: products.category
      })
      .from(products)
      .where(eq(products.id, id));
    
    return product[0] || null;
  } catch (error) {
    console.error('Error fetching product with images:', error);
    return null;
  }
}

export async function getProductsByCategory(categorySlug: string) {
  return await db
    .select()
    .from(products)
    .where(eq(products.category, categorySlug))
    .orderBy(products.createdAt);
}

export async function getProductDetails(productId: string) {
  const result = await db
    .select()
    .from(products)
    .where(eq(products.id, parseInt(productId)))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function getCategories() {
  return await db
    .select()
    .from(categories)
    .orderBy(categories.name);
}

export async function getCategoryBySlug(categorySlug: string) {
  const result = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, categorySlug))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function getProductCount() {
  const result = await db.select({ count: count() }).from(products);
  return result[0].count;
}

export async function getCategoryProductCount(categorySlug: string) {
  const result = await db
    .select({ count: count() })
    .from(products)
    .where(eq(products.category, categorySlug));
  
  return result[0].count;
}

export async function getSearchResults(searchTerm: string) {
  if (!searchTerm || searchTerm.trim().length === 0) {
    return [];
  }

  return await db
    .select()
    .from(products)
    .where(
      or(
        like(products.name, `%${searchTerm}%`),
        like(products.description, `%${searchTerm}%`),
        like(products.category, `%${searchTerm}%`)
      )
    )
    .limit(10);
}

// Enhanced queries for static generation and prefetching
export async function getAllStaticPaths() {
  try {
    const allProducts = await getAllProducts();
    const paths: { category: string; product: string }[] = [];
    
    allProducts.forEach((product) => {
      if (product.category) {
        paths.push({
          category: product.category,
          product: product.id.toString(),
        });
      }
    });
    
    return paths;
  } catch (error) {
    console.error('Error generating static paths:', error);
    return [];
  }
}

export async function getAllCategorySlugs() {
  try {
    const categoryList = await db.select({ slug: categories.slug }).from(categories);
    return categoryList.map((cat: { slug: string }) => ({ category: cat.slug }));
  } catch (error) {
    console.error('Error fetching category slugs:', error);
    return [];
  }
}
