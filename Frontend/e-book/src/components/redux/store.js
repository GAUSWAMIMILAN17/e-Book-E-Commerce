import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import bookSlice from "./bookSlice";
import orderSlice from "./orderSlice";
import cartSlice from "./cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
  key: "root", // loacalStorage key
  storage, // localStorage
  whitelist: ["user", "cart"], //kai reducer parsist karvi => books/orders usually API se aave che → persist na karo
};

const rootReducer = combineReducers({
  user: authSlice,
  books: bookSlice,
  orders: orderSlice,
  cart: cartSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer
});
export const persistor = persistStore(store)

export default store;
