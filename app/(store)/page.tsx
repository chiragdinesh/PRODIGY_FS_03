import ProductsView from "@/components/ProductsView";
import SaleBanner from "@/components/SaleBanner";
import { getAllCategories } from "@/sanity/products/getAllCategories";
import { getAllProducts } from "@/sanity/products/getAllProducts";

export const dynamic = "force-static";
export const revalidate = 60;

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  console.log(
    crypto.randomUUID().slice(0, 5) +
      `>>> Rendered the home page cache with ${products.length} products and ${categories.length} categories`
  );

  return (
    <div>
      <SaleBanner />
      <div className="flex flex-col items-center min-h-screen justify-top p-4 bg-gray-100 ">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
