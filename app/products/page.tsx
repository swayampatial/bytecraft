import ProductsContainer from "@/components/products/ProductsContainer";

interface ProductsPageProps {
  searchParams: {
    layout?: string;
    search?: string;
  };
}

const ProductsPage = ({ searchParams }: ProductsPageProps) => {
  const layout = searchParams?.layout || "grid";
  const search = searchParams?.search || "";

  return <ProductsContainer layout={layout} search={search} />;
};

export default ProductsPage;
