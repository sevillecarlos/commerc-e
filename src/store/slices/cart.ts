import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  cartProducts: Array<string[]>(),
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action) {
      state.cartProducts.push(action.payload);
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
