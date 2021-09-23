import { configureStore } from "@reduxjs/toolkit";

import productsDataSlice from "./slices/productsData";
import cartSlice from "./slices/cart";
import authSlice from "./slices/auth";
import transactionSlice from "./slices/transaction";

const store = configureStore({
  reducer: {
    productsData: productsDataSlice.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    transaction: transactionSlice.reducer,
  },
});

export default store;
