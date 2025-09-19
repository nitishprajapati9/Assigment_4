"use client";

import { useAppSelector } from "../_store/hooks";
import { ShoppingCartIcon, Trash2 } from "lucide-react";

export default function CartPage() {
  const { firstName, lastName, email } = useAppSelector((state) => state.users);
  const cartProducts = useAppSelector((state) => state.cart.products);

  const loadRazorpay = () =>
    new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      document.body.appendChild(script);
    });

  const handleCheckout = async () => {
    try {
      let totalAmount = cartProducts.reduce(
        (acc, item) => acc + item.productPrice * item.quantity,
        0
      );

      totalAmount = Math.floor(totalAmount)

      const res = await fetch("/api/razor-pay", {
        method: "POST",
        body: JSON.stringify({ amount: totalAmount }),
      });

      console.log(res)

      const { order } = await res.json();

      console.log(order)

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        curreny: order.currency,
        name: { firstName } + " " + { lastName },
        description: "Order Summary",
        order_id: order.id,
        handler: function (response: any) {
          alert(`Payment Successful: ${response.razorpay_payment_id}`);
          // Clear cart or navigate to order success page
        },
        prefill: {
          name: `${firstName} ${lastName}`,
          email: email,
        },
        theme: {
          color: "#0ea5ep",
        },
      };
      await loadRazorpay()
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  if (cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
        <div className="bg-white p-10 rounded-2xl shadow-xl flex flex-col items-center">
          <ShoppingCartIcon className="w-24 h-24 text-gray-300 mb-6" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Hey {firstName} {lastName}, your cart is empty
          </h1>
          <p className="text-gray-500 mb-6 text-center">
            Browse products and add items to your cart to see them here.
          </p>
          <a
            href="/dashboard"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            Go Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Hey {firstName} {lastName}, your Cart
        </h1>

        <div className="flex flex-col gap-6">
          {cartProducts.map((product) => (
            <div
              key={product.productId}
              className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4 hover:shadow-2xl transition"
            >
              <img
                src={product.image}
                alt={product.productName}
                className="w-28 h-28 object-cover rounded-lg"
              />
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-xl font-semibold">
                    {product.productName}
                  </h2>
                  <p className="text-gray-500 mt-1">
                    {product.productdescription}
                  </p>
                </div>
                <p className="text-lg font-bold text-blue-600 mt-2">
                  ₹{product.productPrice} × {product.quantity} = ₹
                  {product.productPrice * product.quantity}
                </p>
              </div>
              <button className="p-2 text-red-500 hover:text-red-600 transition">
                <Trash2 />
              </button>
            </div>
          ))}
        </div>

        {/* Total & Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 flex justify-between items-center">
          <div>
            <p className="text-lg font-medium">
              Total Items:{" "}
              {cartProducts.reduce((acc, item) => acc + item.quantity, 0)}
            </p>
            <p className="text-xl font-bold text-gray-800">
              Total Price: ₹
              {Math.floor(cartProducts.reduce(
                (acc, item) => acc + item.productPrice * item.quantity,
                0
              ))}
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition">
              Clear Cart
            </button>
            <button
              onClick={handleCheckout}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
