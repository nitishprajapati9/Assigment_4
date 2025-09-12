"use client"

import {ReactNode, useEffect} from "react"
import { useRouter } from "next/navigation"
import { UseSelector } from "react-redux"
import { useAppSelector } from "../_store/hooks"
import { getCurrentUser } from "../services/Queries"
import { LoaderIcon } from "lucide-react"

export default function ProtectedRoute({children}:{children:ReactNode}){
    // const router  = useRouter()
    // console.log("Protected Routes")
    // const accessToken = useAppSelector((state) => state.users.accessToken)

    // const getCurrentUserHook = getCurrentUser(accessToken as string)

    // if(getCurrentUserHook.isError){
    //     router.replace("/")
    // }

    // if(getCurrentUserHook.isSuccess){
    //     router.replace("/dashboard")
    // }

    // if(getCurrentUserHook.isPending){
    //     return (
    //         <div className="min-h-screen flex justify-center items-center">
    //             <LoaderIcon />
    //         </div>
    //     )
    // }
    // useEffect(() => {
    //     if(!accessToken){
    //         router.replace("/")
    //     }
    // },[accessToken,router])

    // if(!accessToken ){
    //     return <p className="text-center mt-10">Redirecting to Login....</p>
    console.log("Protected Routes")
    // }
    return (
        <div>
            {children}
        </div>
    )
}