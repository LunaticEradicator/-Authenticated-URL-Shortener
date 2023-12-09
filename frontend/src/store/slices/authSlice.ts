import { createSlice } from "@reduxjs/toolkit";

// if there is cookie which contain jwt
// which is an object store it as a reducer state
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") || "{}")
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    registerCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logoutCredentials: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { loginCredentials, registerCredentials, logoutCredentials } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
