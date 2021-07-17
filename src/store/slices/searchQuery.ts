import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { removeRepeatElements } from "../../helper/removeRepeatElements";

const initialState = {
  products: new Array<string[]>(),
  error: null,
  status: "idle",
};

export const fetchsearchQuery = createAsyncThunk(
  "searchQuery/fetchsearchQuery",
  async (query: any) => {
    const res = await fetch("http://localhost:1337/categories");
    const data = await res.json();
    return data;
  }
);
const searchQuerySlice = createSlice({
  name: "searchQuery",
  initialState,
  reducers: {
    addsearchQuery(state, action) {
      state.products.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchsearchQuery.fulfilled, (state, action) => {
      state.products = [];
      state.status = "success";
      const { meta, payload } = action;

      const categories = payload.flatMap((category: { products: {}[] }) => {
        return category.products;
      });

      const searchQuery = categories
        .filter((product: { title: string; description: string }) => {
          return (
            product.title.toLowerCase().indexOf(meta.arg) > -1 ||
            product.description.toLowerCase().indexOf(meta.arg) > -1
          );
        })
        .sort((a: { id: number }, b: { id: number }) => a.id - b.id);

      state.products.push(...removeRepeatElements(searchQuery));
    });
    builder.addCase(fetchsearchQuery.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchsearchQuery.rejected, (state) => {
      state.status = "reject";
    });
  },
});

export const searchQueryActions = searchQuerySlice.actions;
export default searchQuerySlice;
