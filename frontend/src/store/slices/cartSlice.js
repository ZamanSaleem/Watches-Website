import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async ({ itemId, token }, { rejectWithValue }) => {
    try {
      if (token) {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
      }
      return itemId;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateQuantityAsync = createAsyncThunk(
  "cart/updateQuantity",
  async ({ itemId, quantity, token }, { rejectWithValue }) => {
    try {
      if (token) {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, quantity },
          { headers: { token } }
        );
      }
      return { itemId, quantity };
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const getUserCartAsync = createAsyncThunk(
  "cart/getUserCart",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        return response.data.cartData;
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {},
    delivery_fee: 10,
    currency: "$",
  },
  reducers: {
    clearCart: (state) => {
      state.items = {};
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const itemId = action.payload;
        state.items[itemId] = (state.items[itemId] || 0) + 1;
      })
      .addCase(updateQuantityAsync.fulfilled, (state, action) => {
        const { itemId, quantity } = action.payload;
        if (quantity <= 0) {
          delete state.items[itemId];
        } else {
          state.items[itemId] = quantity;
        }
      })
      .addCase(getUserCartAsync.fulfilled, (state, action) => {
        state.items = action.payload || {};
      });
  },
});

export const { clearCart, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart.items;
export const selectDeliveryFee = (state) => state.cart.delivery_fee;
export const selectCurrency = (state) => state.cart.currency;

export const selectCartCount = (state) => {
  return Object.values(state.cart.items).reduce(
    (total, quantity) => total + quantity,
    0
  );
};

export const selectCartAmount = (state) => {
  const items = state.cart.items;
  const products = state.products.items;

  return Object.entries(items).reduce((total, [itemId, quantity]) => {
    const product = products.find((p) => p._id === itemId);
    if (product) {
      return total + product.price * quantity;
    }
    return total;
  }, 0);
};
