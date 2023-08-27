import {  createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
    message: "",
    error: false,
    alert: false,
  },
  //----REDUCERS----
  reducers: {
    // -------- switch the alert component's display. will use it inside SetTimeout.
    switchAlert: (state, action) => {
      if (state.error) {
        state.error = false;
      }
      state.alert = false;
    },
    // ----------- LOGIN USER
    loginUser: (state, action) => {
      if (!action.payload.success) {
        state.error = true;
      } else {
        state.error = false;
        state.userInfo = action.payload.user;
        console.log("user inside loginUser ", state.userInfo);
      }
      state.alert = true;
      state.message = action.payload.message;
    },
    // ------------- REGISTER / SIGN-UP USER
    registerUser : (state, action) => {
      if(!action.payload.success) {
        state.error = true;
      } else {
        state.error = false;
      }
      state.alert = true;
      state.message = action.payload.message;
    }
  }
  
});

export const { loginUser, switchAlert, registerUser } = userSlice.actions;
export default userSlice.reducer;
