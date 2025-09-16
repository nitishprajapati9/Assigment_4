"use client";

import { useDashboardPaginationProduct } from "@/app/services/Queries";
import { useState } from "react";
import Card from "../_components/Card";
import { CircleAlert, Loader } from "lucide-react";

export default function DashboardPage() {
  const [page, setPage] = useState(0);
  const { data, isPending, isError, isPlaceholderData, error, isFetching,refetch } =
    useDashboardPaginationProduct(page);
  

    if(isFetching){
        return (
            <div className="flex justify-center items-center min-h-screen z-50 relative">
                <Loader size={36} className="animate-spin"/>
            </div>
        )
    }

   if (isError) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <CircleAlert size={64} className="text-red-500" />
      <p className="text-xl font-semibold text-gray-800">
        Failed to Load the Products
      </p>
      <button
        onClick={() => refetch()}
        className="px-6 py-3 rounded-lg bg-red-500 text-white text-lg font-bold shadow-md hover:bg-red-600 transition-all"
      >
        Reload
      </button>
    </div>
  );
}


  return (
    <div>
      {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.products.map((product) => (
            <div>
              {/* <li>{product.description}</li> */}
              <Card productInfo={product} />
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-row justify-center items-center gap-4 m-4">
        <button
          className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium shadow hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </button>

        <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg shadow font-semibold">
          {page + 1}
        </span>

        <button
          className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium shadow hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
          onClick={() => {
            if (!isPlaceholderData && data?.hasMore) {
              setPage((old) => old + 1);
            }
          }}
          disabled={isPlaceholderData || !data?.hasMore}
        >
          Next
        </button>
      </div>

      
    </div>
  );
}
