import { getProductsByCategory } from "@/actions/getproduct";
import ProductGrid from "@/components/productgrid";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";

type Props = {
  params: { category: string };
};

export async function generateStaticParams() {
  return await db.select({ category: categories.slug }).from(categories);
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  
  // Get products for this specific category
  const products = await getProductsByCategory(category);
  
  // Get category info for display
  const categoryInfo = await db.select().from(categories).where(eq(categories.slug, category));
  const categoryName = categoryInfo[0]?.name || category;

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold capitalize text-center">
            {categoryName}
          </h1>
          {/* <p className="text-gray-600 text-center mt-2">
            {products.length} products found
          </p> */}
        </div>
        <ProductGrid 
          product={products} 
          category={category}
        />
      </main>
    </div>
  );
}
