import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginFormResponse } from "../types/Auth";



const initialState: LoginFormResponse = {
    accessToken:"",
    id:0,
    email:"",
    username:"",
    firstName:"",
    lastName:"",
    image:"",
    refreshToken:"",
    gender:""
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<LoginFormResponse>) => {
      return action.payload
    },
    clearUser: (state) => {
      return initialState;
    },
    // updateUser:(state,action:PayloadAction<id:>) => {

    // }
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
