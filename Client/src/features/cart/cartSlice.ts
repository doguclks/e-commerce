import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../models/ICart";
import requests from "../../api/request";

interface CartState {
    cart : Cart | null;
    status : string,
}
const initialState : CartState = {
    cart : null,
    status : "idle"
}  

export const addItemToCart = createAsyncThunk<Cart, {productId : number, quantity?: number}>(
    "cart/addItemToCart",
    async ({productId, quantity=1}) =>
    {
        try
        {
        return await requests.Cart.addItem(productId, quantity)
        }
        catch(err)
        {
            console.log(err);
        }
    }
);

export const deleteItemFromCart = createAsyncThunk<Cart, {productId : number, quantity?: number, key?: string}>(
    "cart/deleteItemFromCart",
    async ({productId, quantity=1}) =>
    {try
        {
        return await requests.Cart.deleteItem(productId, quantity)
        }
        catch(err)
        {
            console.log(err);
        }
    }
);

export const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {

        setCart : (state, action) => {
            state.cart = action.payload
        }
    },
    extraReducers : (builder) => {
        builder.addCase(addItemToCart.pending, (state, action) => {
            state.status = "loadingAddItem" + action.meta.arg.productId;
        })
        builder.addCase(addItemToCart.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.cart = action.payload
        })
        builder.addCase(addItemToCart.rejected, (state) => {
            state.status = "failed"
        })
        builder.addCase(deleteItemFromCart.pending, (state, action) => {
            state.status = "loadingDeleteItem" + action.meta.arg.productId + action.meta.arg.key;
        })
        builder.addCase(deleteItemFromCart.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.cart = action.payload
        })
        builder.addCase(deleteItemFromCart.rejected, (state) => {
            state.status = "failed"
        })
    }
})

export const {setCart} = cartSlice.actions