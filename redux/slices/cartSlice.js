import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    pizzaList: [],
    cartCount: 0,
    total: 0,
  },
  reducers: {
    addPizza: (state, action) => {
      state.pizzaList.push(action.payload);
      state.total += action.payload.price * action.payload.qty;
      state.cartCount += 1;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { addPizza, reset } = cartSlice.actions;
export default cartSlice.reducer;
