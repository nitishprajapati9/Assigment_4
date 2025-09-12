"use client";

import { useAppSelector } from "@/app/_store/hooks";
import { User, LogIn, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {

  const router = useRouter()
  const user = useAppSelector((state) => state.users)
  const {firstName,lastName} = user
 
  return (
    <nav className="w-full bg-white shadow-md px-8 py-4 flex items-center justify-between">
      <div className="text-xl font-bold text-blue-600">Products.io</div>

      {user && (
        <div className="text-gray-700 text-lg font-medium">
            Welcome, <span className="font-semibold">{firstName} {lastName}</span>
        </div>
      )}

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
              <User className="w-5 h-5 text-gray-700" onClick={() => router.push(`/profile/${user.id}`)}/>
              <span className="hidden sm:inline">Profile</span>
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </>
        ) : (
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            <LogIn className="w-5 h-5" />
            <span className="hidden sm:inline">Sign In</span>
          </button>
        )}
      </div>
    </nav>
  );
}
