import {  createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : '',
    message: "",
    error: false,
    alert: false,
    authToken: localStorage.getItem("auth") ? localStorage.getItem('auth') : ""
  },
  //============ REDUCERS ============ 
  reducers: {

    triggerAlert : (state, action) =>{
      state.alert = true;
      if(!action.payload.success) {
        state.error  = true
      } else {
        state.error = false;
      } 
      state.message = action.payload.message;

    },
    // -switch the alert component's display. will use it inside SetTimeout.
    switchAlert: (state, action) => {
      if (state.error) {
        state.error = false;
      }
      state.alert = false;
    },
    // - LOGIN USER
    loginUser: (state, action) => {
      if (!action.payload.success) {
        state.error = true;
      } else {
        state.error = false;
        state.userInfo = action.payload.user;
        state.authToken = action.payload.token;
        // console.log("user inside loginUser ", state.userInfo);
      }
      state.alert = true;
      state.message = action.payload.message;
    },
    //- LOGOUT USER
    logoutUser : (state, action) => {
      localStorage.clear()
      state.userInfo = ""
      state.authToken = ""
      // To get alert on logout
      state.alert = true;
      state.message = action.payload;
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
    },

    // ------------- Forgot passowrd
    forgetPassword : (state, action) => {
      if(!action.payload.success){
        state.error = true;
      } else {
        state.error = false;
      }
      state.alert = true;
      state.message = action.payload.message;
    }
  }
  
});

export const { loginUser, triggerAlert, switchAlert, registerUser, logoutUser, forgetPassword } = userSlice.actions;
export default userSlice.reducer;
