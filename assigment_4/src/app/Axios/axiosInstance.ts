import axios from "axios";
import { BASEURL } from "../constants/Endpoints";

const axiosInstance = axios.create({
    baseURL:BASEURL,
    timeout:10000,
    headers:{
        "Content-Type":"application/json"
    ,}
});

// axiosInstance.interceptors.request.use(
//     (config) => {
//         //const token = localStorage.getItem("token")
//         const token = useAppSelector((state) => state.users.accessToken)
//         if(token){
//             config.headers.Authorization = `Bearer ${token}`
//         }
//         return config
//     },
//     (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if(error.response?.status === 401){
//             console.log("Unauthorized, Redirect to Login")
//         }
//         return Promise.reject(error)
//     }
// )

export default axiosInstance