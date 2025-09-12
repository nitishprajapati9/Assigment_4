"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Close sidebar on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) document.addEventListener("mousedown", handleClickOutside)
    else document.removeEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 text-white shadow-lg hover:scale-105 transition-transform"
      >
        <Menu size={24} />
      </button>

      <aside
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 h-screen w-72 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 text-white shadow-2xl z-50
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-500 ease-in-out
          md:translate-x-0 md:static md:shadow-none rounded-r-2xl
        `}
      >
        <div className="flex justify-between items-center p-6 text-2xl font-bold border-b border-gray-700">
          <span>Products.io</span>
          <button
            className="md:hidden p-1 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-6 flex flex-col gap-3 text-lg">
          {[
            { href: "/", label: "Dashboard" },
            { href: "/profile/1", label: "Profile" },
            { href: "/settings", label: "Settings" },
            { href: "/logout", label: "Logout" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}
