import { NextRequest, NextResponse } from "next/server";
import { parseHTML } from "linkedom";
import { getProduct, getProductsByCategory, getproduct } from "@/actions/getproduct";

export const dynamic = "force-static";

export async function GET(
  _: NextRequest,
  { params }: { params: { rest: string[] } },
) {
  const href = (await params).rest.join("/");
  if (!href) {
    return new Response("Missing url parameter", { status: 400 });
  }
  
  try {
    // Check if this is a product or category page and get images directly from database
    const pathParts = href.split('/');
    
    if (pathParts.length === 2) {
      // This is a product page: /category/productId
      const [category, productId] = pathParts;
      const product = await getProduct(productId);
      
      if (product?.images) {
        
        
        
        return NextResponse.json({
          images: product.images.map(img => ({
            src: img.src,
            alt: img.alt || product.name,
            width: 600,
            height: 600
          }))
        });
      }

    } else if (pathParts.length === 1) {
      // This is a category page: /category
      const category = pathParts[0];
      const products = await getProductsByCategory(category);
      
      const images = products.flatMap(product => 
        product.images?.map(img => ({
          src: img.src,
          alt: img.alt || product.name,
          width: 300,
          height: 300
        })) || []
      );
      
      return NextResponse.json({ images });
    } else if (href === '' || href === '/') {
      // This is the homepage
      const products = await getproduct();
      const images = products.flatMap(product => 
        product.images?.map(img => ({
          src: img.src,
          alt: img.alt || product.name,
          width: 300,
          height: 300
        })) || []
      );
      
      return NextResponse.json({ images });
    }
    
    // Fallback to HTML parsing for other pages
    const url = `http://localhost:3000/${href}`;
    const response = await fetch(url);
    if (!response.ok) {
      return new Response("Failed to fetch", { status: response.status });
    }
    
    const body = await response.text();
    const { document } = parseHTML(body);
    const images = Array.from(document.querySelectorAll("main img"))
      .map((img) => ({
        srcset: img.getAttribute("srcset") || img.getAttribute("srcSet"),
        sizes: img.getAttribute("sizes"),
        src: img.getAttribute("src"),
        alt: img.getAttribute("alt"),
        loading: img.getAttribute("loading"),
      }))
      .filter((img) => img.src);
      
    return NextResponse.json(
      { images },
      {
        headers: {
          "Cache-Control": "public, max-age=3600",
        },
      },
    );
  } catch (error) {
    console.error("Prefetch images error:", error);
    return NextResponse.json({ images: [] });
  }
}
