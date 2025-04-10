"use client";
  import ProductsContainer from "@/components/products/ProductsContainer";
  import { useState } from "react";

  async function ProductsPage({
    searchParams,
  }: {
    searchParams: { layout?: string; search?: string };
  }) {
    const [layout, setLayout] = useState("grid");
    const [search, setSearch] = useState("");
    const getParams = async () => {
      const { layout, search } = await searchParams;
      return { layout, search };
    };
    (async () => {
      const { layout, search } = await getParams();
      if (layout) setLayout(layout);
      if (search) setSearch(search);
    })();

    return <ProductsContainer layout={layout} search={search} />;
  }
  export default ProductsPage;