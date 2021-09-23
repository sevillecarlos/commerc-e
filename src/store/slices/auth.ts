import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  error: null,
  status: "idle",
  firstTime: false,
  userCredentials: undefined,
  userCredit: undefined,
};

export const fetchSignIn = createAsyncThunk(
  "auth/fetchSignIn",
  async (signInForm: any) => {
    const res = await fetch(`http://127.0.0.1:5000/api/v1/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInForm),
    });
    const data = await res.json();
    localStorage.setItem("$@token", data.token);
    return data.token;
  }
);

export const fetchSignUp = createAsyncThunk(
  "auth/fetchSignUp",
  async (signUpForm: any) => {
    const res = await fetch(`http://127.0.0.1:5000/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpForm),
    });
    const data = await res.json();
    return data;
  }
);

export const fetchCredit = createAsyncThunk(
  "auth/fetchCredit",
  async (idUser: any) => {
    const res = await fetch(`http://127.0.0.1:5000/api/v1/credits/${idUser}`);
    const data = await res.json();
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeUser(state) {
      state.user = "";
    },
  },
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
    builder.addCase(fetchSignUp.fulfilled, (state, action) => {
      state.status = "success";
      state.userCredentials = action.payload;
    });
    builder.addCase(fetchSignUp.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSignUp.rejected, (state) => {
      state.status = "reject";
    });
    builder.addCase(fetchCredit.fulfilled, (state, action) => {
      state.status = "success";
      state.userCredit = action.payload;
    });
    builder.addCase(fetchCredit.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCredit.rejected, (state) => {
      state.status = "reject";
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice;
