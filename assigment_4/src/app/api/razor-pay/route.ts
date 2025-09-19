import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { amount, currency = "INR" } = await req.json();

  try {
    const razorpay = new Razorpay({
      key_id: "rzp_test_RJPadJAEYOr7mV",
      key_secret: "wKA5fdEu9JJXsiorQETcPXQ6",
    });

    const options = {
      amount: amount * 100,
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    console.log("API Endpoint",order)

    return NextResponse.json({ order });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error });
  }
}
