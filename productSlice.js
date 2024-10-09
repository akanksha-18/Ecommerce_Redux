import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../actions/productActions";


const productSlice=createSlice({
    name:"product",
    initialState:{
       products:[],
       loading:false,
       error:false
    },reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getProducts.pending,(state)=>{
            state.loading=true
        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.loading=false
            state.error=false
            state.products=action.payload
        }).addCase(getProducts.rejected,(state)=>{
            state.error=true
        })
    }   

})

export default productSlice.reducer