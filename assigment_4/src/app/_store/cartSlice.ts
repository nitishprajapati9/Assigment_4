import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface product {
    productId:number,
    productName:string,
    productdescription:string,
    productPrice:number,
    quantity:number,
    discountPercentage:number,
    image:string
}

interface CartState {
    products : product[]
}

const initialState:CartState = {
    products:[]
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<product>) => {
            const existingProduct = state.products.find(
                (p) => p.productId === action.payload.productId
            );

            if(existingProduct){
                existingProduct.quantity += action.payload.quantity
            }else{
                state.products.push(action.payload)
            }
        },
        removeFromCart:(state,action:PayloadAction<number>) =>{
            state.products = state.products.filter(
                (p) => p.productId != action.payload
            )
        },
        clearCart:(state) => {
            state.products = []
        },
    },

});

export const selectCartCount = (state:RootState) => {
    return state.cart.products.reduce((total,product) => total + product.quantity,0)
}

export const {addToCart,removeFromCart,clearCart} = cartSlice.actions;
export default cartSlice.reducer