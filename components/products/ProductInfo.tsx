"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ShoppingCart,
  Heart,
  Eye,
  ChevronRight,
  Star,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useFavorite } from "@/components/FavoriteContext";

type Product = {
  id: string;
  name: string;
  company: string;
  description: string;
  featured: boolean;
  image: string;
  price: number;
  clerkId: string;
};

function ProductInfo({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { favorite, addfavorite, removefavorite } = useFavorite();

  const isFavorite = favorite.includes(productId);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/singleprod?id=${productId}`);

        if (!res.ok) {
          throw new Error(`Failed to fetch product: ${res.status}`);
        }

        const data = await res.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product information. Please try again.");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "inr",
    }).format(price);
  };

  if (loading) {
    return (
      <Card className="mb-6 overflow-hidden shadow-md rounded-xl">
        <div className="animate-pulse p-6">
          <div className="flex gap-6">
            <div className="rounded-lg bg-gray-200 h-40 w-40"></div>
            <div className="flex-1 space-y-4 py-2">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-5 bg-gray-200 rounded w-1/3"></div>
              <div className="space-y-2 pt-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (error || !product) {
    return (
      <Card className="mb-6 p-6 border-red-200 rounded-xl">
        <div className="flex items-center gap-3 text-red-500">
          <div className="rounded-full bg-red-100 p-2"></div>
          <div>
            <h3 className="font-medium">Error Loading Product</h3>
            <p className="text-sm">{error || "Product not found"}</p>
          </div>
        </div>
      </Card>
    );
  }

  const toggleFavorite = () => {
    if (isFavorite) {
      removefavorite(productId);
    } else {
      addfavorite(productId);
    }
  };

  return (
    <Card className="mb-6 overflow-hidden rounded-xl border-0 shadow-lg transition-all duration-300 hover:shadow-xl max-w-2xl">
      {isExpanded ? (
        // Expanded View
        <div className="p-0">
          {/* Top Navigation Bar for expanded view */}
          <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFavorite}
                className={
                  isFavorite
                    ? "text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }
              >
                <Heart
                  className="h-5 w-5"
                  fill={isFavorite ? "currentColor" : "none"}
                />
              </Button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Product Image - Left Column */}
            <div className="flex items-center justify-center bg-white rounded-lg p-4">
              <img
                src={product.image || "/api/placeholder/400/400"}
                alt={product.name}
                className="object-contain w-full max-h-80 rounded-lg shadow-sm"
              />
            </div>

            {/* Product Details - Right Column */}
            <div className="flex flex-col">
              {/* Product Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.featured && (
                  <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-indigo-200 px-3 py-1">
                    <Star className="h-3 w-3 mr-1" /> Featured
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className="text-indigo-600 bg-indigo-50 border-indigo-100 px-3 py-1"
                >
                  {product.company}
                </Badge>
              </div>

              {/* Product Name and Price */}
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <div className="text-indigo-600 font-bold text-xl mb-4">
                {formatPrice(product.price)}
              </div>

              {/* Product Description */}
              <div className="mb-8">
                <h3 className="text-gray-700 font-medium mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Product ID */}
              <div className="text-xs text-gray-500 mb-6">
                Product ID: {product.id}
              </div>

              {/* Action Buttons */}
              <div className="mt-auto grid grid-cols-1 gap-3">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-6">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="w-full border-gray-300"
                >
                  <Link href={`/product/${product.id}`}>
                    View Full Details
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-6 max-w-xl">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0 relative">
              <img
                src={product.image || "/api/placeholder/200/200"}
                alt={product.name}
                className="max-w-[200px] sm:w-64 h-full object-cover rounded-lg shadow-sm"
              />
              {product.featured && (
                <Badge className="absolute top-2 left-2 bg-amber-100 text-amber-800 border-amber-200">
                  <Star className="h-3 w-3 mr-1" /> Featured
                </Badge>
              )}
            </div>
            <div className="flex flex-col flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <Badge
                    variant="outline"
                    className="mb-2 text-indigo-600 bg-indigo-50 border-indigo-100"
                  >
                    {product.company}
                  </Badge>
                  <h3 className="font-bold text-xl mb-1">{product.name}</h3>
                  <div className=" font-bold text-lg mb-2">
                    {formatPrice(product.price)}
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleFavorite}
                    className={
                      isFavorite
                        ? "text-red-500"
                        : "text-gray-400 hover:text-red-500"
                    }
                  >
                    <Heart
                      className="h-5 w-5"
                      fill={isFavorite ? "currentColor" : "none"}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsExpanded(true)}
                    className="text-gray-400 hover:text-gray-700"
                  >
                    <Eye className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="mt-auto pt-4 grid grid-cols-2 gap-3">
                <Button className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
                  <ShoppingCart className=" h-4 w-4 " />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="border-gray-300 group"
                >
                  <Link href={`/products/${product.id}`}>
                    Details
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-[2px] transition-transform ease-in-out" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export default ProductInfo;
