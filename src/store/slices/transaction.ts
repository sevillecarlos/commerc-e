import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  status: "idle",
  userCredit: undefined,
  userReceipt: undefined,
  receiptArticles: Array<string[]>(),
};

export const getCredit = createAsyncThunk(
  "auth/getCredit",
  async (idUser: any) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/credits/${idUser}`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postCreditUser = createAsyncThunk(
  "auth/postCredit",
  async (userCredits: any) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/credits/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userCredits),
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getReceipts = createAsyncThunk(
  "auth/getReceipts",
  async (userId: any) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/receipts/${userId}`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getReceiptArticles = createAsyncThunk(
  "auth/getReceiptArticles",
  async (receiptId: any) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/articles/${receiptId}`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postUserReceipts = createAsyncThunk(
  "auth/fetchUserReceipts",
  async (receiptCred: any) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/receipts/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(receiptCred),
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const transactionSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCredit.fulfilled, (state, action) => {
      state.status = "success";
      state.userCredit = action.payload;
    });
    builder.addCase(getCredit.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getCredit.rejected, (state) => {
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

    builder.addCase(getReceipts.fulfilled, (state, action) => {
      state.status = "success";
      state.userReceipt = action.payload;
    });
    builder.addCase(getReceipts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getReceipts.rejected, (state) => {
      state.status = "reject";
    });

    builder.addCase(getReceiptArticles.fulfilled, (state, action) => {
      state.status = "success";
      state.receiptArticles = action.payload;
    });
    builder.addCase(getReceiptArticles.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getReceiptArticles.rejected, (state) => {
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
