import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { CurrentUser, getDashboardProductWithPaginationService, getProductBasedOnCategory, getProductCategoriesService, getSingleProduct } from "./api";

export function getCurrentUser(accessToken:string){
    return useQuery({
        queryKey:["Current_User"],
        queryFn:() => CurrentUser(accessToken as string)
    })
}

export function useProductCategories(){
    return useQuery({
        queryKey:["Product Category"],
        queryFn:() => getProductCategoriesService()
    })
}

export function useDashboardPaginationProduct(page:number = 0){
    return useQuery({
        queryKey:["Dashboard Products",page],
        queryFn:() => getDashboardProductWithPaginationService(page),
        placeholderData:keepPreviousData
    })
}

export function useProductType(id:string){
    return useQuery({
        queryKey:["Product Type",id],
        queryFn:() => getSingleProduct(id)
    })
}

export function useCategoryType(slug:string,page:number = 0){
    return useQuery({
        queryKey:["Catgeory Type",slug],
        queryFn:() => getProductBasedOnCategory(slug,page),
        placeholderData:keepPreviousData
    })
}