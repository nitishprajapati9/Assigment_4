"use client";

import { useProductType } from "@/app/services/Queries";
import { CircleAlert, Loader, Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import React, { useState } from "react";

export default function SingleProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const { data, isPending, isError, refetch } = useProductType(id);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen px-4 bg-gradient-to-br from-red-50 to-red-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CircleAlert size={32} className="text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">We couldn't load the product details. Please try again.</p>
          <button
            onClick={() => refetch()}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <Loader className="animate-spin w-8 h-8 text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600 text-center">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const originalPrice = (data.price + (data.price * data.discountPercentage) / 100).toFixed(2);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            <div className="p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white">
              <div className="relative group mb-6">
                <img
                  src={selectedImage || data.thumbnail}
                  alt={data.title}
                  className="w-full h-64 sm:h-80 lg:h-96 object-contain rounded-2xl bg-white shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                
                {data.discountPercentage > 0 && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    -{data.discountPercentage}% OFF
                  </div>
                )}
                
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full shadow-lg transition-all duration-200 ${
                      isFavorite 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white text-gray-600 hover:bg-red-50'
                    }`}
                  >
                    <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                  </button>
                  <button className="p-2 bg-white text-gray-600 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-200">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              <div className="flex gap-3 p-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
                {data.images.map((img: string, i: number) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Product ${i + 1}`}
                    onClick={() => setSelectedImage(img)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 p-4 object-cover rounded-xl cursor-pointer transition-all duration-200 hover:scale-110 ${
                      (selectedImage || data.thumbnail) === img
                        ? "ring-3 ring-blue-500 shadow-lg"
                        : "ring-1 ring-gray-200 hover:ring-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="p-6 lg:p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      {data.brand}
                    </span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      data.stock > 10 
                        ? 'bg-green-100 text-green-800' 
                        : data.stock > 0 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {data.stock > 0 ? `${data.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>
                  
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-3">
                    {data.title}
                  </h1>
                  
                  <p className="text-gray-600 text-base leading-relaxed">
                    {data.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < Math.round(data.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-800">{data.rating}</span>
                  <span className="text-gray-500">({data.reviews?.length || 0} reviews)</span>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-3xl font-bold text-green-600">
                      ${data.price}
                    </span>
                    {data.discountPercentage > 0 && (
                      <span className="text-lg line-through text-gray-400">
                        ${originalPrice}
                      </span>
                    )}
                  </div>
                  {data.discountPercentage > 0 && (
                    <p className="text-sm text-green-700">
                      You save ${(parseFloat(originalPrice) - data.price).toFixed(2)}!
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <label className="font-semibold text-gray-700">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded-xl">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors rounded-l-xl"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors rounded-r-xl"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-8">
                <button 
                  disabled={data.stock === 0}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  {data.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
                
                <button 
                  disabled={data.stock === 0}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
                >
                  {data.stock > 0 ? 'Buy Now' : 'Notify When Available'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Warranty</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {data.warrantyInformation}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Truck className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Shipping</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {data.shippingInformation}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <RotateCcw className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Returns</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {data.returnPolicy}
            </p>
          </div>
        </div>

        {/* Reviews Section */}
        {data.reviews && data.reviews.length > 0 && (
          <div className="mt-12">
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Star className="text-yellow-500" size={24} />
                Customer Reviews ({data.reviews.length})
              </h2>
              
              <div className="grid gap-6">
                {data.reviews.map((review: any, i: number) => (
                  <div
                    key={i}
                    className="border border-gray-200 p-6 rounded-2xl hover:shadow-md transition-shadow duration-200 bg-gradient-to-br from-gray-50 to-white"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {review.reviewerName}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(review.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star
                            key={j}
                            size={16}
                            className={
                              j < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                        <span className="ml-2 text-sm font-semibold text-gray-700">
                          {review.rating}/5
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}