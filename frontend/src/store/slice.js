import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    userData: {
      token: "",
      userId: "",
      isLoged: false,
    },
  },
  reducers: {
    userlogin: (state, action) => {
      state.userData.isLoged = true;
      state.userData.token = action.payload.token;
      state.userData.userId = action.payload.userId;
    },
    logout: (state) => {
      state.userData.isLoged = false;
      state.userData.token = "";
      state.userData.userId = "";
    },
    
    addToCart: (state, action) => {
      console.log(action.payload);
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        
        itemInCart.productQuantity += action.payload.productQuantity;
      } else {
      
        state.cart.push({ ...action.payload });
      }
    },

    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.productQuantity++;
    },

    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.productQuantity === 1
        ? (item.productQuantity = 1)
        : item.productQuantity--;
    },

    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload
      );
      state.cart = removeItem;
    },
    clearCart: (state) => {
      state.cart.length = 0;
    },
  },
});

export const reducer = slice.reducer;

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
  userlogin,
  logout,
} = slice.actions;
