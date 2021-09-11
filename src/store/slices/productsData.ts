import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { removeRepeatElements } from "../../helper/removeRepeatElements";

const initialState = {
  categories: new Array<string[]>(),
  error: null,
  data: new Array<string[]>(),
  status: "idle",
  productsCategories: new Array<string[]>(),
  queryProducts: new Array<string[]>(),
  product: new Array<string[]>(),
};

export const fetchProducts = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const res = await fetch("http://localhost:1337/categories");
    const data = await res.json();
    return data;
  }
);
const productsDataSlice = createSlice({
  name: "data products",
  initialState,
  reducers: {
    getCategories(state, action) {
      const productsData = action.payload;
      const categories = productsData.map(
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
      state.categories = categories;
    },

    getCategoriesProducts(state, action) {
      const productsData = action.payload;
      const productsCategories = productsData.data.filter(
        (el: { name: string }) => el.name.toLowerCase() === productsData.id
      );
      const products = productsCategories[0]?.products;
      state.productsCategories = products;
    },

    getProductsByQuery(state, action) {
      const productsData = action.payload;
      const categories = productsData.data.flatMap(
        (category: { products: {}[] }) => {
          return category.products;
        }
      );
      const searchQuery = categories
        .filter((product: { title: string; description: string }) => {
          return (
            product.title.toLowerCase().indexOf(productsData.id) > -1 ||
            product.description.toLowerCase().indexOf(productsData.id) > -1
          );
        })
        .sort((a: { id: number }, b: { id: number }) => a.id - b.id);

      state.queryProducts = removeRepeatElements(searchQuery);
    },
    getProduct(state, action) {
      const productsData = action.payload;
      const findCategory = productsData.data.filter(
        (v: any) => v.slug === productsData.type
      );
      const findProducts = findCategory[0]?.products.filter(
        (v: any) => v.title.toLowerCase() === productsData.id
      );
      state.product = findProducts;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = "reject";
    });
  },
});

export const productsDataActions = productsDataSlice.actions;
export default productsDataSlice;
