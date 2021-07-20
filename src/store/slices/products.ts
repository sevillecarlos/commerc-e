import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { stat } from "fs";

const initialState = {
  products: new Array<string[]>(),
  error: null,
  status: "idle",
  product: new Array<string[]>(),
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (idCategory: string | number) => {
    const res = await fetch("http://localhost:1337/categories");
    const data = await res.json();
    if (data) {
      let category = data.filter(
        (el: { name: string }) => el.name.toLowerCase() === idCategory
      );
      return category;
    }
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts(state, action) {
      state.products.push(action.payload);
    },
    getProduct(state, action) {
      state.product = [];
      const products = state.products.map((v) => Object.assign({}, v));
      const findProduct = products.filter(
        (v: any) => v.title.toLowerCase() === action.payload
      );
      state.product.push(...findProduct);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = [];
      state.status = "success";
      const categoriesName = action.payload;
      state.products.push(...categoriesName[0].products);
    });
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = "reject";
    });
  },
});

export const productsActions = productsSlice.actions;
export default productsSlice;
