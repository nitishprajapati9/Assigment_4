"use client";
import { cloneElement, isValidElement, ReactNode, useState } from "react";
import ProtectedRoute from "../_ProtectedRoutes/ProtectedRoute";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";
import SearchBar from "./_components/SearchBar";
import SearchBarWrapper from "./_components/SearchBarWrapper";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [searchText, setSearchText] = useState("");
  const pathName = usePathname();
  const searchEnabledRegex = /^\/products(\/category\/[^\/]+)?\/?$/;
  const dashboardRegex = /^\/dashboard\/?$/;
  const isSearchBarAllowed = searchEnabledRegex.test(pathName) || dashboardRegex.test(pathName);
  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen">
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex-1 h-full overflow-auto">
            <div className="w-full flex justify-center p-8">
              {isSearchBarAllowed && <SearchBarWrapper />}
            </div>
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
