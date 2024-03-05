

import { createSlice } from "@reduxjs/toolkit";





let productsSlice = createSlice({
name : "products" ,
initialState : {  counter : 0 , userName : "mohamed"  } ,
reducers :{
    inc : function(state , action){
        state.counter += action.payload
    } ,
    dec : function(state){
        state.counter--
    } ,
    changeName : function(state){
        state.changeName = "Fadel"
    } ,
}
})

 export let productReducer = productsSlice.reducer ;

 export let {inc , dec , changeName} = productsSlice.actions