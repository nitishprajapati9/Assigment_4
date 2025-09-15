import { Products } from "@/app/types/PaginatedProduct";
import { IndianRupee, ReceiptIndianRupeeIcon, Star } from "lucide-react";

export default function Card({ productInfo }: { productInfo: Products }) {
  const discountedPrice = productInfo.discountPercentage
    ? (productInfo.price - (productInfo.price * productInfo.discountPercentage) / 100).toFixed(2)
    : productInfo.price.toFixed(2);

  return (
    <div className="w-full border border-gray-300 rounded-2xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
      {/* Thumbnail */}
      <div className="relative flex justify-center items-center bg-gray-100 h-64">
        <img
          className="h-full max-h-60 object-contain mx-auto"
          src={productInfo.thumbnail}
          alt={productInfo.title}
        />
        {productInfo.discountPercentage > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-md">
            -{productInfo.discountPercentage}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-3">
        {/* Title */}
        <h5 className="text-xl font-bold text-gray-900 line-clamp-1">
          {productInfo.title}
        </h5>

        {/* Description */}
        <p className="text-base text-gray-700 line-clamp-3 leading-relaxed">
          {productInfo.description}
        </p>

        {/* Category */}
        <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          {productInfo.category}
        </span>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {productInfo.tags.map((tag) => (
            <span
              key={tag}
              className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="mt-4">
          {productInfo.discountPercentage > 0 ? (
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-900 flex flex-row gap-1">
                <IndianRupee />{discountedPrice}
              </span>
              <span className="text-lg line-through text-gray-500 flex flex-row">
                <IndianRupee /> {productInfo.price.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-2xl font-bold text-gray-900 flex flex-row gap-1">
              <IndianRupee />{productInfo.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-yellow-500 text-lg"><Star className="fill-amber-300" /></span>
          <span className="text-base font-semibold text-gray-800">
            {productInfo.rating.toFixed(1)} / 5
          </span>
        </div>
      </div>
    </div>
  );
}
