import { createSlice } from "@reduxjs/toolkit";
import { getAllBlogs, getSingleBlog } from "../actions/blogActions";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    singleBlog:{},
    loading: false,
    error: false,
    singleBlogLoading: false,
    singleBlogError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.loading = false;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getSingleBlog.pending, (state) => {
        state.singleBlogLoading = true;
      })
      .addCase(getSingleBlog.rejected, (state, action) => {
        state.singleBlogError = action.payload;
        state.singleBlogLoading = false;
      })
      .addCase(getSingleBlog.fulfilled,(state,action)=>{
        state.singleBlog=action.payload
        state.loading=false
        state.error=false
      })
  }
});

export default blogSlice.reducer;
