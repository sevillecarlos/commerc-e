import { configureStore } from "@reduxjs/toolkit";

import categoriesSlice from "./slices/categories";
import productsSlice from "./slices/products";
import searchQuery from "./slices/searchQuery";
import cartSlice from "./slices/cart";
import authSlice from "./slices/auth";

const store = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
    products: productsSlice.reducer,
    searchQuery: searchQuery.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
