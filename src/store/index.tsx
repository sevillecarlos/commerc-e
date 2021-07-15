import { configureStore } from "@reduxjs/toolkit";

import categoriesSlice from "./slices/categories";
import productsSlice from "./slices/products";
import searchQuery from "./slices/searchQuery";

const store = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
    products: productsSlice.reducer,
    searchQuery: searchQuery.reducer,
  },
});

export default store;
