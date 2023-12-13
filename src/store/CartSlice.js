import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProduct: [],
    cartProductCount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      console.log(action, "h");
      state.cartProduct.push(action.payload);
      state.cartProductCount = state.cartProduct.length;
    },
    //reset the cart on - (login, logout)
    resetCart: (state, action) => {
      state.cartProduct = [];
      state.cartProductCount = 0;
    },
  },
});

export const { addToCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
