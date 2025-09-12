import { useQuery } from "@tanstack/react-query";
import { CurrentUser } from "./api";

export function getCurrentUser(accessToken:string){
    return useQuery({
        queryKey:["Current_User"],
        queryFn:() => CurrentUser(accessToken as string)
    })
}