import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  errorSignIn: "",
  errorSignUp: "",
  status: "idle",
  firstTime: false,
  userCredentials: undefined,
};

export const fetchSignIn = createAsyncThunk(
  "auth/fetchSignIn",
  async (signInForm: any) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signInForm),
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchSignUp = createAsyncThunk(
  "auth/fetchSignUp",
  async (signUpForm: any) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpForm),
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeUser(state) {
      state.token = "";
    },
    clearError(state) {
      state.errorSignUp = "";
      state.errorSignIn = "";
    },
    getToken(state) {
      const authToken: any = localStorage.getItem("$@token");
      state.token = authToken;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignIn.fulfilled, (state, action) => {
      state.status = "success";
      if (action.payload.token) {
        state.token = action.payload.token;

        localStorage.setItem("$@token", state.token);
      } else {
        state.errorSignIn = action.payload.error;
      }
    });
    builder.addCase(fetchSignIn.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSignIn.rejected, (state) => {
      state.status = "reject";
    });
    builder.addCase(fetchSignUp.fulfilled, (state, action) => {
      state.status = "success";
      const { error } = action.payload;
      if (error) {
        const { email } = error;
        state.errorSignUp = "Email " + email[0];
      } else {
        state.userCredentials = action.payload;
      }
    });
    builder.addCase(fetchSignUp.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSignUp.rejected, (state) => {
      state.status = "reject";
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice;
