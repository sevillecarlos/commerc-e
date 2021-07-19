import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  error: null,
  status: "idle",
};

export const fetchSignIn = createAsyncThunk(
  "auth/fetchSignIn",
  async (signInForm:any) => {
    const res = await fetch(`http://127.0.0.1:5000/api/v1/session/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInForm),
    });
    const data = await res.json();
    return data;
  }
);

export const fetchSignUp = createAsyncThunk("auth/fetchSignUp", async () => {
  const res = await fetch("http://localhost:1337/categories");
  const data = await res.json();
  return data;
});

const authSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSignIn.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload;
    });
    builder.addCase(fetchSignIn.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSignIn.rejected, (state) => {
      state.status = "reject";
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice;
