import { fetchSingleProduct } from "@/utils/actions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id") || "";

    const product = await fetchSingleProduct(id);
    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 404 });
  }
}
