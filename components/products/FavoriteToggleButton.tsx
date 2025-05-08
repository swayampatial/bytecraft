"use client";
import { FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useFavorite } from "../FavoriteContext";
import { useEffect, useState } from "react";

function FavoriteToggleButton({ productId }: { productId: string }) {
  const { favorite, addfavorite, removefavorite } = useFavorite();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favorite.includes(productId));
  }, [favorite, productId]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removefavorite(productId);
    } else {
      addfavorite(productId);
    }
  };

  return (
    <Button
      size="icon"
      variant="outline"
      className={`p-2 ${
        isFavorite ? "text-red-500" : "text-black-500"
      } hover:text-red-500 cursor-pointer`}
      onClick={toggleFavorite}
    >
      <FaHeart />
    </Button>
  );
}

export default FavoriteToggleButton;
