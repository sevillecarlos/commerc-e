import { configureStore } from "@reduxjs/toolkit";

import categoriesSlice from "./slices/categories";

const store = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
  },
});

export default store;
