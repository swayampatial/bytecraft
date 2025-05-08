import { Product } from "@prisma/client";
import { formatCurrency } from "@/utils/format";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import FavoriteToggleButton from "./FavoriteToggleButton";

function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="pt-2 grid gap-8 md:grid-cols-2">
      {products.map((product) => {
        const { name, price, image } = product;
        const productId = product.id;
        const amount = formatCurrency(price);
        return (
          <article key={productId} className="group">
            <Card className="overflow-hidden  transition-all duration-300 border-0">
              <CardContent className="p-0">
                <div className="relative z-20 w-full h-96">
                  <Link href={`/products/${productId}`}>
                    <Image
                      src={image}
                      alt={name}
                      fill
                      quality={100}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      className="object-contain"
                    />
                  </Link>
                  <div className="absolute z-50 top-4 right-4">
                    <FavoriteToggleButton productId={productId} />
                  </div>
                </div>

                {/* Product Details Section */}
                <div className="p-6 bg-white">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold capitalize">{name}</h2>
                    <p className="text-xl font-semibold text-primary">
                      {amount}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm text-green-700">In Stock</span>
                    </div>

                    {/* <Link
                        href={`/products/${productId}`}
                        className="text-primary hover:text-primary-dark transition-colors text-sm font-medium"
                      >
                        See Details →
                      </Link> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>
        );
      })}
    </div>
  );
}

export default ProductsGrid;
