import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TanstackQueryClientProvider from "./Providers/QueryClientProvider";
import ReducerProvider from "./Providers/ReducerProvider";
import { Toaster } from "react-hot-toast";
import Navbar from "./(with-Navbar-Sidebar)/_components/Navbar";
import { usePathname } from "next/navigation";
import { NavbarProvider } from "./Providers/NavbarProvider";
import { SearchProvider } from "./Providers/SearchProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome Products.io",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full min-h-screen`}
      >
        <TanstackQueryClientProvider>
          <ReducerProvider>
            <SearchProvider>{children}</SearchProvider>
            <Toaster />
          </ReducerProvider>
        </TanstackQueryClientProvider>
      </body>
    </html>
  );
}
