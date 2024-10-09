import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getProducts=createAsyncThunk("product/getproducts",async(limit="")=>{
    try {
        const {data}= await axios.get(`https://fakestoreapi.com/products?limit=${limit}`)
        return data
    } catch (error) {
        console.log(error)
    }
})

