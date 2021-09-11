import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  status: "idle",
  userCredit: undefined,
  userReceipt: undefined,
};

export const fetchCredit = createAsyncThunk(
  "auth/fetchCredit",
  async (idUser: any) => {
    const res = await fetch(`http://127.0.0.1:5000/api/v1/credits/${idUser}`);
    const data = await res.json();
    return data;
  }
);

export const postCreditUser = createAsyncThunk(
  "auth/postCredit",
  async (userCredits: any) => {
    const res = await fetch(`http://127.0.0.1:5000/api/v1/credits/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredits),
    });
    const data = await res.json();
    return data;
  }
);

export const fetchReceipts = createAsyncThunk(
  "auth/fetchReceipts",
  async (userId: any) => {
    const res = await fetch(`http://127.0.0.1:5000/api/v1/receipts/${userId}`);
    const data = await res.json();
    return data;
  }
);

export const postUserReceipts = createAsyncThunk(
  "auth/fetchUserReceipts",
  async (receiptCred: any) => {
    const res = await fetch(`http://127.0.0.1:5000/api/v1/receipts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(receiptCred),
    });
    const data = await res.json();
    return data;
  }
);

const transactionSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
    builder.addCase(postCreditUser.fulfilled, (state, action) => {
      state.status = "success";
      state.userCredit = action.payload;
    });
    builder.addCase(postCreditUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(postCreditUser.rejected, (state) => {
      state.status = "reject";
    });
    builder.addCase(fetchReceipts.fulfilled, (state, action) => {
      state.status = "success";
      state.userReceipt = action.payload;
    });
    builder.addCase(fetchReceipts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchReceipts.rejected, (state) => {
      state.status = "reject";
    });
    builder.addCase(postUserReceipts.fulfilled, (state, action) => {
      state.status = "success";
      state.userReceipt = action.payload;
    });
    builder.addCase(postUserReceipts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(postUserReceipts.rejected, (state) => {
      state.status = "reject";
    });
  },
});

export const authActions = transactionSlice.actions;
export default transactionSlice;
