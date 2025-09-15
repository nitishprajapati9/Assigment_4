"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { CircleAlert, Loader, Loader2, Menu, X } from "lucide-react"
import { useProductCategories } from "@/app/services/Queries"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const getProducts = useProductCategories()
  
 

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
        className={`fixed inset-0 bg-opacity-30 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 p-2 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed  top-4 left-4 z-50 p-2 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 text-white shadow-lg hover:scale-105 transition-transform"
        style={{
          left:isOpen ? "18rem" : "1rem",
          transition: "left 0.4s ease-in-out", 
        }}
      >
        {isOpen ? <X className="sm:hidden"/> : <Menu className="sm:hidden" />}
      </button>

      <aside
        ref={sidebarRef}
        className={`
          overflow-y-scroll scrollbar-hidden
          fixed top-0 left-0 w-72 bg-gradient-to-b shadow-2xl z-50
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-500 ease-in-out
          md:translate-x-0 md:static md:shadow-none rounded-r-2xl bg-blue-300
        `}
      >
        

         {!isOpen && getProducts.isPending && (
          <div className="flex flex-row justify-center items-center min-h-screen">
            <Loader size={24} className="animate-spin"/>
          </div>
        )}

        {!isOpen && getProducts.isError && (
          <div className="flex flex-col justify-center items-center">
            <CircleAlert className=" text-red-500" />
            <p className=" text-red-500">Failed to Load Items</p>
          </div>
        )}

        {isOpen && getProducts.isPending && (
          <div className="flex flex-row justify-center items-cente">
            <Loader className="animate-spin"/>
          </div>
        )}

        {isOpen && getProducts.isError && (
          <div className="flex flex-col justify-center items-center">
            <CircleAlert className=" text-red-500" />
            <p className=" text-red-500">Failed to Load Items</p>
          </div>
        )}

        <nav className="p-6 flex flex-col gap-3 text-lg">
          {getProducts?.data?.map((link) => (
            <Link
              key={link.slug}
              href={link.slug}
              className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-200 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}
