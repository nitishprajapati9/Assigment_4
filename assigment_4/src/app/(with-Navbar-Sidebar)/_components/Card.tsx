import { addToCart } from "@/app/_store/cartSlice";
import { useAppDispatch } from "@/app/_store/hooks";
import { useProductType } from "@/app/services/Queries";
import { Products } from "@/app/types/PaginatedProduct";
import { IndianRupee, Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Card({ productInfo }: { productInfo: Products }) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useAppDispatch();
  const discountedPrice = productInfo.discountPercentage
    ? (
        productInfo.price -
        (productInfo.price * productInfo.discountPercentage) / 100
      ).toFixed(2)
    : productInfo.price.toFixed(2);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add quick view functionality here
    console.log("Quick view:", productInfo.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add to cart functionality here
    const addPromise = new Promise<void>((resolve, reject) => {
      try {
        dispatch(
          addToCart({
            productId: productInfo.id,
            productName: productInfo.title,
            productdescription: productInfo.description,
            quantity: 1,
            productPrice: productInfo.price,
            discountPercentage: productInfo.discountPercentage,
            image:productInfo.thumbnail
          })
        );
        resolve();
      } catch (err) {
        reject(err);
      }
    });

    toast.promise(addPromise, {
      loading: "Adding to Cart..",
      success: "Item added to Cart",
      error: "Failed to add Item",
    });
  };

  return (
    <div
      onClick={() => router.push(`/products/${productInfo.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 border border-gray-100"
    >
      {/* Thumbnail Container */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 h-64 overflow-hidden">
        <img
          className="h-full w-full object-contain mx-auto transition-transform duration-500 group-hover:scale-110"
          src={productInfo.thumbnail}
          alt={productInfo.title}
        />

        {/* Discount Badge */}
        {productInfo.discountPercentage > 0 && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-2 rounded-full shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            -{productInfo.discountPercentage}% OFF
          </div>
        )}

        {/* Action Buttons Overlay */}
        <div
          className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
        >
          <button
            onClick={handleFavoriteClick}
            className={`p-2.5 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
              isFavorite
                ? "bg-red-500 text-white"
                : "bg-white/80 text-gray-600 hover:bg-red-50"
            }`}
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>

          <button
            onClick={handleQuickView}
            className="p-2.5 bg-white/80 text-gray-600 rounded-full shadow-lg backdrop-blur-sm hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:scale-110"
          >
            <Eye size={18} />
          </button>
        </div>

        {/* Stock Status */}
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-md">
            In Stock
          </span>
        </div>

        {/* Quick Add to Cart Button */}
        <div
          className={`absolute bottom-4 right-4 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <button
            onClick={handleAddToCart}
            className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Category */}
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs font-semibold rounded-full uppercase tracking-wide">
            {productInfo.category}
          </span>

          {/* Rating */}
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-800">
              {productInfo.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Title */}
        <h5 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
          {productInfo.title}
        </h5>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {productInfo.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {productInfo.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full hover:from-blue-100 hover:to-purple-100 hover:text-blue-700 transition-all duration-200"
            >
              {tag}
            </span>
          ))}
          {productInfo.tags.length > 3 && (
            <span className="text-xs text-gray-500 font-medium px-2 py-1">
              +{productInfo.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Price Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-100">
          {productInfo.discountPercentage > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center text-2xl font-bold text-green-600">
                  <IndianRupee size={20} />
                  <span>{discountedPrice}</span>
                </div>
                <div className="flex items-center text-lg line-through text-gray-500">
                  <IndianRupee size={16} />
                  <span>{productInfo.price.toFixed(2)}</span>
                </div>
              </div>
              <p className="text-xs text-green-700 font-medium">
                You save ₹
                {(productInfo.price - parseFloat(discountedPrice)).toFixed(2)}!
              </p>
            </div>
          ) : (
            <div className="flex items-center text-2xl font-bold text-gray-900">
              <IndianRupee size={20} />
              <span>{productInfo.price.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md mr-3 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Add to Cart</span>
              <span className="sm:hidden">Add</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/products/${productInfo.id}`);
              }}
              className="px-4 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 transform hover:scale-105"
            >
              <Eye size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}
