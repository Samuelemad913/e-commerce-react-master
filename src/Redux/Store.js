import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productSlice";






 let store =  configureStore({
    reducer :{
        productReducer ,
    }
})


export default store ;