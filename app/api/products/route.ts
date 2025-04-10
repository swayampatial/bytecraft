import { fetchAllProducts } from "@/utils/actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();
  const products = await fetchAllProducts({ search: req?.search });
  console.log(products)
  return NextResponse.json({
    products: products,
  });
}
