import { LoginFormInputs } from "@/app/types/Auth";
import axiosInstance from "../Axios/axiosInstance";
import {  LOGIN_URL } from "../constants/Endpoints";
import axios from "axios";
import { Categories } from "../types/Products";
import { PaginatedProduct, Products } from "../types/PaginatedProduct";
import { ProductType } from "../types/ProductType";

export async function LoginService(data:LoginFormInputs){
    return (await axiosInstance.post(LOGIN_URL,data)).data
}

export async function CurrentUser(accessToken: string) {
  try {
    const token = `Bearer ${accessToken}`
    const response = await axios.get("https://dummyjson.com/auth/me", {
      headers: {
        Authorization: token,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
}

export async function getProductCategoriesService(){
  try{
    const response = await axios.get<Categories[]>("https://dummyjson.com/products/categories")
    return response.data
  }
  catch(error){
    console.log("Error fetching Categories:",error)
    throw error
  }
}

export async function getDashboardProductWithPaginationService(page:number = 0){
  try{
    //const response = await
    const response = (await axios.get<PaginatedProduct>(`https://dummyjson.com/products?limit=9&skip=${page*10}&select=title,description,category,discountPercentage,rating,tags,thumbnail,price`)).data

    console.log(response)

    return {
      ...response,
      hasMore:response.skip + response.limit < response.total
    }
    //return response
  }
  catch(error){
    console.log("Error Fetching the Dashboard Categories Produce",error)
    throw error
  }
}

export async function getSingleProduct(id:string){
  try{
    const response = (await axios.get<ProductType>(`https://dummyjson.com/products/${id}`)).data
    return response
  }
  catch(error){
    console.log("Error Fetching the Single Product",error)
    throw error
  }
}

export async function getProductBasedOnCategory(slug:string,page:number){
  try{
    const response = (await axios.get<PaginatedProduct>(`https://dummyjson.com/products/category/${slug}?skip=${page*10}&limit=9`)).data
    return response
  }
  catch(error){
    console.log("Error Fetching the Catgeory Based Product",error)
    throw error
  }
}
