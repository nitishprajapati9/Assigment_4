import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginFormInputs, LoginFormResponse } from "../types/Auth";
import { LoginService } from "./api";


export function useLoginHook(){
    return useMutation<LoginFormResponse,Error,LoginFormInputs>({
        mutationKey : ["login"],
        mutationFn : (data:LoginFormInputs) => LoginService(data),
    })
}