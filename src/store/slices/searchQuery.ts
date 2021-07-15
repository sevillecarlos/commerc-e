import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: new Array<string[]>(),
  error: null,
  status: "idle",
};

export const fetchsearchQuery = createAsyncThunk(
  "searchQuery/fetchsearchQuery",
  async (query: string) => {
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
      state.searchQuery.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchsearchQuery.fulfilled, (state, action) => {
      state.status = "success";
      const { meta, payload } = action;

      const categories = payload.flatMap((category: { products: {}[] }) => {
        return category.products;
      });

      const searchQuery = categories.filter(
        (product: { title: string; description: string }) =>
          product.title.includes(meta.arg) ||
          product.description.includes(meta.arg)
      );
      
      console.log(searchQuery);
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
