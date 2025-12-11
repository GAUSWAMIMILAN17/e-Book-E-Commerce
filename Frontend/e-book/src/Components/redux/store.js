import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import bookSlice from "./bookSlice"
import orderSlice from "./orderSlice"
import cartSlice from "./cartSlice"

const store = configureStore({
  reducer: {
    user: authSlice,
    books: bookSlice,
    orders: orderSlice,
    cart: cartSlice
  },
});

export default store;
