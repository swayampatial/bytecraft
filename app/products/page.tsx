"use client";
import ProductsContainer from "@/components/products/ProductsContainer";
import { useParams } from "next/navigation";

function ProductsPage() {
  const params = useParams<{ layout: string; search: string }>();
  const { layout, search } = params;
  return <ProductsContainer layout={layout || "grid"} search={search || ""} />;
}
export default ProductsPage;
