"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { z } from "zod";
type CartItem = {
  image: string | undefined;
  id: number;
  name: string;
  price: number;
  quantity: number;
};
export type { CartItem };
type cartSchema = {
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
};

const cartContext = createContext<cartSchema>({
  cart: [],
  setCart: () => {},
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([
    {
      image: "",
      id: 0,
      name: "",
      price: 0,
      quantity: 0,
    },
  ]);

  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { useCart, CartProvider };
