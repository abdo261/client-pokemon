import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    payments: [],    // All payments
    payment: null,   // Single payment details
    error: null,     // Error message
    loadingGet: false, // Loading state for fetching data
    errorValidation: null, // Validation errors for form submission
  },
  reducers: {
    setPayments(state, action) {
      state.error = null;
      state.payments = action.payload;
    },
    setPayment(state, action) {
      state.error = null;
      state.payment = action.payload;
    },
    addPayment(state, action) {
      state.error = null;
      state.payments = [action.payload, ...state.payments];
    },
    removePayment(state, action) {
      state.error = null;
      state.payments = state.payments.filter(payment => payment.id !== action.payload);
    },
    updatePayment(state, action) {
      state.error = null;
      state.payments = state.payments.map(payment =>
        payment.id === action.payload.id ? action.payload.payment : payment
      );
     
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setErrorValidation(state, action) {
      state.errorValidation = action.payload;
    },
    setLoadingGet(state, action) {
      state.loadingGet = action.payload;
    },
  },
});

export const paymentReducer = paymentSlice.reducer;
export const paymentActions = paymentSlice.actions;
