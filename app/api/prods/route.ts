import { NextResponse } from "next/server";
import { fetchAllProducts } from "@/utils/actions";

export async function GET(req: Request) {
  const url = new URL(req.url);
  console.log(url);
  const search = url.searchParams.get("search") || "";
  console.log("this is search", search);

  const products = await fetchAllProducts({ search: search });
  console.log(products);
  return NextResponse.json(products);
}
