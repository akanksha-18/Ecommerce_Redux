import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import blogSlice from "./slices/blogSlice";
import AuthSlice from './slices/AuthSlice'
import cartSlice from "./slices/cartSlice";

export default configureStore({
  reducer: {
    product: productSlice,
    blog: blogSlice,
    cart:cartSlice,
    auth: AuthSlice
  },
});

