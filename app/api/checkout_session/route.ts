import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const { items } = data;
  console.log(typeof items[0].price);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map(
        (item: { name: any; price: any; quantity: any }) => ({
          price_data: {
            currency: "inr",
            product_data: { name: item.name },
            unit_amount: item.price*100,
          },
          quantity: item.quantity,
        })
      ),
      mode: "payment",
      success_url: `http://localhost:3000/success?success=true`,
      cancel_url: `http://localhost:3000/success/?canceled=true`,
    });
    console.log(session);
    return NextResponse.json(
      { url: session.url, isredirect: true },
      {
        status: 303,
      }
    );
  } catch (err) {
    // res.status(500).json({ error: (err as Error).message });
    return NextResponse.json({ error: (err as Error).message });
  }
}
