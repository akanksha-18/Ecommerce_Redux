import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllBlogs=createAsyncThunk("blog/getBlogs",async()=>{
    try {
        let {data}=await axios.get(`${import.meta.env.VITE_BLOG_API}`)
        return data
    } catch (error) {
        console.error(error)
        
    }
})

export const getSingleBlog=createAsyncThunk("blog/getSingleBlog",async(id)=>{
    try {
        let {data}=await axios.get(`${import.meta.env.VITE_BLOG_API}/${id}`)
        return data
    } catch (error) {
        console.error(error)
        
    }
})