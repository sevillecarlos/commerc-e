import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  cart: Array<string[]>(),
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartProducts(state, action) {
      state.cart = action.payload;
    },
    addCart(state, action) {
      state.cart.push(action.payload);
    },
    clearCart(state) {
      state.cart = Array<string[]>();
    },
    getCartProducts(state) {
      const cartValues: any = localStorage.getItem("cart");
      state.cart = JSON.parse(cartValues);
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
