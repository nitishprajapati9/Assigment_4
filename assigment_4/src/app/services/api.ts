import { LoginFormInputs } from "@/app/types/Auth";
import axiosInstance from "../Axios/axiosInstance";
import {  LOGIN_URL } from "../constants/Endpoints";
import axios from "axios";

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
