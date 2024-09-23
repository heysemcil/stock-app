import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { uiReducer } from "./ui";
import { categoriesReducer } from "./categories";
import { brandReducer } from "./brands";
import { firmsReducer } from "./firms";
import { productsReducer } from "./products";
import { saleReducer } from "./sales";
import { PurchaseReducer } from "./purchases";

export const store = configureStore({
    reducer:{
        auth:authReducer,
        ui: uiReducer, 
        categories: categoriesReducer,
        brands: brandReducer, 
        firms:firmsReducer, 
        products: productsReducer, 
        sales: saleReducer, 
        purchases: PurchaseReducer
    }
})