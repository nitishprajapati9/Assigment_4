"use client"
import { Search, SortAsc } from "lucide-react";
import { useState } from "react";

export default function SearchBar({
    searchText,
    setSearchText
}:{
    searchText:string,
    setSearchText:(val:string) => void
}) {



  return (
    <div className="w-full flex justify-center items-center gap-4 p-6">
      <div className="relative w-1/2">
        <input
          className="w-full p-4 pr-12 rounded-2xl border border-gray-300 focus:border-blue-600 shadow-sm focus:ring-2 focus:ring-blue-200 outline-none transition"
          placeholder="Search your Items..."
          onChange={(e) => (setSearchText(e.target.value))}
        />
        <Search className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400" />
      </div>

      <button className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-gray-300 bg-white shadow-sm hover:bg-gray-50 transition">
        <span className="text-gray-700 font-medium">Sort</span>
        <SortAsc className="text-gray-600" />
      </button>
    </div>
  );
}
