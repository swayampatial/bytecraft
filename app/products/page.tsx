"use client";
import ProductsContainer from "@/components/products/ProductsContainer";


type productParams = Promise<{
  layout?: string;
  search?: string;
}>;

async function ProductsPage(props: { params: productParams }) {
  const { layout, search } = await props.params;
  return <ProductsContainer layout={layout || "grid"} search={search || ""} />;
}
export default ProductsPage;