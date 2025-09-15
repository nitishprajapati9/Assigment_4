import { ReactNode } from "react";
import ProtectedRoute from "../_ProtectedRoutes/ProtectedRoute";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <div className="hidden md:block">
          <Navbar />
        </div>

        <div className="flex flex-1">
          <Sidebar/>

          <main className="flex-1 p-6 m-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
