import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    product: null,
    error: null,
    errorValidation: null,
    loadingGet: false,
  },
  reducers: {
    setProducts(state, action) {
      state.error = null;
      state.products = action.payload;
    },
    setProduct(state, action) {
      state.error = null;
      state.product = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    addProduct(state, action) {
      state.error = null;
      state.products = [action.payload, ...state.products];
    },
    removeProduct(state, action) {
      state.error = null;
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
    updateProduct(state, action) {
      state.error = null;
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
      if (state.product && state.product.id === action.payload.id) {
        state.product = action.payload;
      }
    },
    setErrorValidation(state, action) {
      state.errorValidation = action.payload;
    },
    setLoadingGet(state, action) {
      state.loadingGet = action.payload;
    },
  },
});

export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;
