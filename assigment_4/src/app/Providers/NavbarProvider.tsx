"use client"

import { createContext,useContext,useState,ReactNode } from "react"
import Navbar from "../(with-Navbar-Sidebar)/_components/Navbar"

type NavbarContextType = {
    showNavbar:boolean;
    setShowNavbar:(value:boolean) => void
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined)

export function NavbarProvider({children}:{children:ReactNode}){
    const [showNavbar,setShowNavbar] = useState(true)

    return (
        <NavbarContext.Provider value={{setShowNavbar,showNavbar}}>
            {showNavbar && <Navbar/>}
            {children} 
        </NavbarContext.Provider>
    )
}

export function useNavbar(){
    const context = useContext(NavbarContext)
    if(!context){
        throw new Error("useNavbar must be inside NavbarProvider")
    }
    return context
}