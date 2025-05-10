"use client";
import ProductsContainer from "@/components/products/ProductsContainer";
import { useParams, useSearchParams } from "next/navigation";

function ProductsPage() {
  const params = useSearchParams();
  const layout = params.get("layout");
  const search = params.get("search");
  return <ProductsContainer layout={layout || "grid"} search={search || ""} />;
}
export default ProductsPage;
