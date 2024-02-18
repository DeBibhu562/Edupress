import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  otp: "",
  password: "",
  error: null,
  loading: false,
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    emailStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    emailSuccess: (state, action) => {
      state.email = action.payload;
      state.loading = false;
      state.error = null;
    },
    emailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    passwordStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    passwordSuccess: (state, action) => {
      state.otp = action.payload;
      state.loading = false;
      state.error = null;
    },
    passwordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    otpStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    otpSuccess: (state, action) => {
      state.otp = action.payload;
      state.loading = false;
      state.error = null;
    },
    otpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  emailStart,
  emailSuccess,
  emailFailure,
  passwordStart,
  passwordSuccess,
  passwordFailure,
  otpStart,
  otpSuccess,
  otpFailure,
} = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
