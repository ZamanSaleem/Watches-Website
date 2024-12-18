import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { setCartItems } from "./cartSlice";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async ({ orderData, method, token }, { dispatch }) => {
    try {
      let response;
      switch (method) {
        case "cod":
          response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            dispatch(setCartItems({}));
            return response.data;
          }
          break;

        case "stripe":
          response = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            return response.data;
          }
          break;
      }
      throw new Error(response.data.message);
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }
);

export const verifyPayment = createAsyncThunk(
  "orders/verifyPayment",
  async ({ params, token }, { dispatch }) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        null,
        { params, headers: { token } }
      );
      if (response.data.success) {
        dispatch(setCartItems({}));
      }
      return response.data;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        return response.data.orders;
      }
      throw new Error(response.data.message);
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;

// Selectors
export const selectOrders = (state) => state.orders.orders;
export const selectOrderStatus = (state) => state.orders.status;
