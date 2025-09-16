import { ReactNode } from "react";
import ProtectedRoute from "../_ProtectedRoutes/ProtectedRoute";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen">
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          
          <main className="flex-1 h-full overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}