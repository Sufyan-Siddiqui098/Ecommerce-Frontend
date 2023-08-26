import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//SIGNUP / REGISTER --- new user
export const registerUser = createAsyncThunk("user/register", async (data) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const json = await response.json();
    // console.log("json", json)
    return json; //return - will make the json available in action.payload below;
  } catch (error) {
    console.log("Error:", error);
    return error;
  }
});

//----------LOGIN - UnderConstruction==========================
export const loginUser = createAsyncThunk("user/login", async (data) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/api/v1/auth/login`, { 
      method: "POST",
      headers: {
        "Content-TYpe": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("error in login", error);
    return error;
  }
});

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
    //switch the alert component's display. will use it inside SetTimeout.
    switchAlert: (state, action) => {
      if (state.error) {
        state.error = false;
      }
      state.alert = false;
      // console.log()
    },
  },
  // ======EXTRA REDUCER - Handle async function ============
  extraReducers: (builder) => {
    /*===================================
      -------REGISTER new user -------
    =================================== */
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.error = false;
        state.alert = true;
        state.userInfo = action.payload.user;
        state.message = action.payload.message;
      } else {
        state.error = true;
        state.alert = true;
        state.message = action.payload.message;
      }
    });
    /*===================================
      ---------- LOGIN User ----------
      =================================== */
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log(action.payload)
      if (action.payload.success) {
        state.error = false;
        state.alert = true;
        state.userInfo = action.payload.user;
        state.message = action.payload.message;
      } else {
        state.error = true;
        state.alert = true;
        state.message = action.payload.message;
      }
    });

  },
});

export const { switchAlert } = userSlice.actions;
export default userSlice.reducer;
