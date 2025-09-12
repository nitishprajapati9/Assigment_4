export interface LoginFormInputs {
    username: string,
    password:string
}

export interface LoginFormResponse{
    id:number,
    username:string,
    email:string,
    firstName:string,
    lastName:string,
    image:string,
    accessToken:string,
    refreshToken:string,
    gender:string
}
