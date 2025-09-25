import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { CurrentUser, getDashboardProductWithPaginationService, getProductBasedOnCategory, getProductBySorting, getProductCategoriesService, getSingleProduct } from "./api";

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

export function useDashboardPaginationProduct(page:number = 0,searchText:string,isSorted:boolean){
    return useQuery({
        queryKey:["Dashboard Products",page,searchText,isSorted],
        queryFn:() => getDashboardProductWithPaginationService(page,searchText,isSorted),
        placeholderData:keepPreviousData
    })
}

export function useProductType(id:string){
    return useQuery({
        queryKey:["Product Type",id],
        queryFn:() => getSingleProduct(id)
    })
}

export function useCategoryType(slug:string,page:number = 0,searchText:string,isSorted:boolean){
    return useQuery({
        queryKey:["Catgeory Type",slug,page,searchText,isSorted],
        queryFn:() => getProductBasedOnCategory(slug,page,searchText,isSorted),
        placeholderData:keepPreviousData
    })
}

export function useProductBySorting(){
    return useQuery({
        queryKey:["Sorting Type"],
        queryFn:() => getProductBySorting(),
        placeholderData:keepPreviousData
    })
}