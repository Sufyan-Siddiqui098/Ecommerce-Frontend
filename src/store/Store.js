import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import searchReducer from "./SearchSlice";
import cartReducer from "./CartSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    searchProduct: searchReducer,
    cart: cartReducer,
  },
});

export default store;
