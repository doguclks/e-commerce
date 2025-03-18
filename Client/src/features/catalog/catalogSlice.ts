import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../models/IProduct";
import requests from "../../api/request";
import { red } from "@mui/material/colors";
import { RootState } from "@reduxjs/toolkit/query";
import { TurnedIn } from "@mui/icons-material";

export const fetchProducts = createAsyncThunk<IProduct[]>(
    "catalog/fetchProducts",
    async () => {
        return await requests.Catalog.list();
    }
)

export const fetchProductById = createAsyncThunk<IProduct, number>(
    "catalog/fetchProductById",
    async (productId: number) => {
        return await requests.Catalog.details(productId);
    }
)

const productsAdapter = createEntityAdapter<IProduct>();

const initialState = productsAdapter.getInitialState({
    status: "idle",
    isLoaded: false,
});

export const catalogSlice = createSlice({
    name : "catalog",
    initialState,
    reducers : {},
    extraReducers: (builder => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "loading";
        }),
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = "idle";
            productsAdapter.setAll(state, action.payload);
            state.isLoaded = true;
        }),
        builder.addCase(fetchProducts.rejected, (state) => {
            state.status = "error";
        }),
        builder.addCase(fetchProductById.pending, (state) => {
            state.status = "loading";
        }),
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            state.status = "idle";
            productsAdapter.upsertOne(state, action.payload);
        }),
        builder.addCase(fetchProductById.rejected, (state) => {
            state.status = "error";
        });
    })

})

export const
{
    selectById : selectProductById,
    selectIds : selectProductIds,
    selectEntities : selectProductEntities,
    selectAll : selectAllProducts,
    selectTotal : selectTotalProducts,
}= productsAdapter.getSelectors((state: any) => state.catalog);