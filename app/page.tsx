import { getproduct, getCategories } from "@/actions/getproduct";
import ProductGrid from "@/components/productgrid";
import { Link } from "@/components/links";


export default async function Home() {
  const products = await getproduct();
  const categories = await getCategories();
  
  // Group products by category
  const groupedProducts = categories.map(category => {
    const categoryProducts = products.filter((product: any) => 
      product.category === category.slug
    ).slice(0, 10); // Max 10 products per category
    
    return {
      name: category.slug,
      displayName: category.name,
      products: categoryProducts
    };
  }).filter(group => group.products.length > 0); // Only show categories with products

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        {groupedProducts.map((category) => (
          <div key={category.name} className="mb-16">
            {/* Category Header */}
            <div className="mb-8">
              <Link 
                href={`/${category.name}`}
                className="text-3xl font-bold hover:text-gray-600 transition-colors"
              >
                {category.displayName}
              </Link>
              {/* <p className="text-gray-600 mt-2">
                {category.products.length} products
              </p> */}
            </div>
            
            {category.products.length > 0 ? (
              <ProductGrid 
                product={category.products}
                category={category.name}
                maxColumns={5}
                spacing="normal"
                showContainer={false}
              />
            ) : (
              <p className="text-gray-500 text-center py-8">
                No products in this category yet.
              </p>
            )}
          </div>
        ))}
      </main>
    </div>
  );
} 