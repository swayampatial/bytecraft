"use client";
import { useCart } from "@/components/CartContext";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface CartItem {
  image: string | undefined;
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CartPage = () => {
  const { cart, setCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedCart = JSON.parse(localStorage.getItem("cart") as string) as
        | CartItem[]
        | null;
      setCart(savedCart || []);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [setCart]);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const handleCheckout = async () => {
    if (!cart.length) return alert("Your cart is empty");
    console.log(cart);
    const res = await fetch("/api/checkout_session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    });

    const { url, isredirect } = await res.json();
    console.log(url, isredirect);
    if (isredirect) {
      redirect(url);
    }
  };

  const handleRemoveItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-white  flex flex-col items-center justify-start py-10">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">
          Your Shopping Cart
        </h1>
        <div className="space-y-6 w-full max-w-3xl">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="flex items-center justify-between bg-neutral-200 p-6 rounded-xl animate-pulse"
            >
              <div className="flex items-center">
                <div className="w-24 h-24 bg-neutral-300 rounded-lg mr-6" />
                <div className="space-y-3">
                  <div className="h-6 w-44 bg-neutral-300 rounded" />
                  <div className="h-4 w-28 bg-neutral-300 rounded" />
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="h-5 w-20 bg-neutral-300 rounded" />
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-neutral-300 rounded-full" />
                  <div className="h-5 w-6 bg-neutral-300 rounded" />
                  <div className="h-8 w-8 bg-neutral-300 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen ">
      <div className="container max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-neutral-900 mb-8">
          Your Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-neutral-700 text-lg">
            Your cart is empty. Add items to get started.
          </p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center bg-white p-6 rounded-xl shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-lg md:mr-6 mb-4 md:mb-0"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-neutral-900">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-neutral-600 text-lg">
                    ₹{item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-neutral-500 hover:text-neutral-700 text-sm"
                  >
                    Remove
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="px-3 py-1 border border-neutral-300 rounded-lg hover:bg-neutral-100 disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="text-neutral-800 font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="px-3 py-1 border border-neutral-300 rounded-lg hover:bg-neutral-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-col md:flex-row md:justify-end md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <span className="text-xl font-semibold text-neutral-800">Total:</span>
          <span className="text-lg font-semibold text-neutral-900">
            ₹{calculateTotal().toFixed(2)}
          </span>
        </div>

        {cart.length > 0 && (
          <div className=" max-w-xs">
            <button
              className="w-full py-3 rounded-xl bg-indigo-700 text-white font-semibold hover:bg-neutral-800 transition"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default CartPage;
