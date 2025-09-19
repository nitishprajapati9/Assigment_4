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

export function useDashboardPaginationProduct(page:number = 0,searchText:string){
    return useQuery({
        queryKey:["Dashboard Products",page,searchText],
        queryFn:() => getDashboardProductWithPaginationService(page,searchText),
        placeholderData:keepPreviousData
    })
}

export function useProductType(id:string){
    return useQuery({
        queryKey:["Product Type",id],
        queryFn:() => getSingleProduct(id)
    })
}

export function useCategoryType(slug:string,page:number = 0,searchText:string){
    return useQuery({
        queryKey:["Catgeory Type",slug,page,searchText],
        queryFn:() => getProductBasedOnCategory(slug,page,searchText),
        placeholderData:keepPreviousData
    })
}