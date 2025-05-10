"use client";
import { useFavorite } from "@/components/FavoriteContext";
import ProductInfo from "@/components/products/ProductInfo";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

function FavoriteItems() {
  const { favorite } = useFavorite();

  if (favorite.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center ">
        <Heart className="w-12 h-12 text-muted-foreground" />
        <p className="text-xl text-muted-foreground">
          You don't have any favorite items yet.
        </p>
        <Link href="/products">
          <Button variant="outline" size="lg" className="mt-6">
            Browse products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mx-auto container">
      {favorite.map((productId) => (
        <ProductInfo key={productId} productId={productId} />
      ))}
    </div>
  );
}
export default FavoriteItems;
