import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProduct: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
    cartProductCount: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).length
      : 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartProduct.push(action.payload);
      localStorage.setItem("cart", JSON.stringify([...state.cartProduct]));
      state.cartProductCount = state.cartProduct.length;
    },
    removeFromCart: (state, action) => {
      state.cartProduct = action.payload;
      state.cartProductCount = state.cartProduct.length;
    },
    //reset the cart on - (login, logout)
    resetCart: (state, action) => {
      state.cartProduct = [];
      state.cartProductCount = 0;
    },
  },
});

export const { addToCart, resetCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
