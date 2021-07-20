import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  categories: new Array<string[]>(),
  error: null,
  data: new Array<string[]>(),
  status: "idle",
  productsCategories: new Array<string[]>(),
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const res = await fetch("http://localhost:1337/categories");
    const data = await res.json();
    return data;
  }
);
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategories(state, action) {
      state.categories.push(action.payload);
    },
    listCategoryProducts(state, action) {
      const categories = state.data.map((value: string[]) =>
        Object.assign({}, value)
      );
      const products = categories.filter((el) => el);
      //state.productsCategories.push(...products);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = "success";
      state.data.push(...action.payload);
      const categoriesName = action.payload.map(
        (category: {
          id: number;
          name: string;
          products: [{ image: { url: string } }];
        }) => {
          return {
            id: category.id,
            name: category.name,
            image: `http://localhost:1337${category.products[0].image.url}`,
          };
        }
      );
      state.categories.push(...categoriesName);
      const products = state.categories.map((x) => x);
    });
    builder.addCase(fetchCategories.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.status = "reject";
    });
  },
});

export const categoriesActions = categoriesSlice.actions;
export default categoriesSlice;
