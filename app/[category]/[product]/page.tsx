import { getProduct, getProductsByCategory } from '@/actions/getproduct';
import { Link } from '@/components/links';
import Image from 'next/image';
import React from 'react';
import ProductQuantity from '@/components/product/productquantity';
import ProductAction from '@/components/product/productactions';
import ProductGrid from '@/components/productgrid';
import { db } from '@/db';
import { products } from '@/db/schema';

type Props = {
  params: { category: string; product: string };
};

export async function generateStaticParams() {
  try {
    // Get all products from database
    const allProducts = await db.select().from(products);
    const params: { category: string; product: string }[] = [];
    
    allProducts.forEach((product) => {
      if (product.category) {
        params.push({
          category: product.category,
          product: product.id.toString(),
        });
      }
    });
    
    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

const ProductPage = async ({ params }: Props) => {
  const { category, product: productId } = await params;
  
  // Get the main product
  const product = await getProduct(productId);
  
  // Get recommended products from the same category (excluding current product)
  const categoryProducts = await getProductsByCategory(category);
  const recommendations = categoryProducts
    .filter((p) => p.id !== parseInt(productId))
    .slice(0, 4); // Show 4 recommendations

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <div className="container mx-auto px-4 py-6">
        <Link
          href={`/${category}`}
          className="inline-flex items-center gap-2 text-lg font-medium mb-6 hover:text-gray-600"
        >
          Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Image */}
          <div className="lg:col-span-2 flex items-center justify-center">
            {product.images?.[0]?.src && (
              <div className="aspect-square rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 w-126 h-126">
                <Image
                  src={product.images[0].src}
                  alt={product.images[0]?.alt || product.name}
                  width={384}
                  height={384}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            )}
          </div>
          
          {/* Cart Actions Sidebar */}
          <div>
            <div className="flex flex-col gap-13 sticky top-20">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <div className="text-2xl font-bold">${(product.price / 100).toFixed(2)}</div>
              <ProductQuantity product={product}/>
              <ProductAction/> 
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12">
          <div className="text-gray-700 prose max-w-none">
            {product.description}
          </div>
        </div>

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-center">You might also like</h2>
            <ProductGrid 
              product={recommendations}
              category={category}
              maxColumns={4}
              spacing="normal"
              showContainer={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
