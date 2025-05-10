"use client";

import { Button } from "../ui/button";
import { toast } from "sonner";

function AddToCart({ product }: { product: any }) {
  const handleAddToCart = () => {
    const CartItem = {
      image: product.image,
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...existingCart, CartItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    console.log("added to cart", CartItem);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Button onClick={handleAddToCart} className="capitalize mt-8" size="lg">
      add to cart
    </Button>
  );
}
export default AddToCart;  