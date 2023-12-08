import { createSlice } from "@reduxjs/toolkit";

// if there is cookie which contain jwt
// which is an object store it as a reducer state
const initialState = {
  userInfo: localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails") || "{}")
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userDetails", JSON.stringify(action.payload));
    },
    registerCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userDetails", JSON.stringify(action.payload));
    },
    logoutCredentials: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userDetails");
    },
  },
});

export const { loginCredentials, registerCredentials, logoutCredentials } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
