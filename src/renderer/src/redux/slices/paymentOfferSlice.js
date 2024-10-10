import { createSlice } from '@reduxjs/toolkit'

const paymentOfferSlice = createSlice({
  name: 'paymentOffer',
  initialState: {
    paymentsOffer: [], // All payments
    paymentOffer: null, // Single payment details
    error: null, // Error message
    loadingGet: false, // Loading state for fetching data
    errorValidation: null // Validation errors for form submission
  },
  reducers: {
    setPaymentsOffer(state, action) {
      state.error = null
      state.paymentsOffer = action.payload
    },
    setPaymentOffer(state, action) {
      state.error = null
      state.paymentOffer = action.payload
    },
    addPaymentOffer(state, action) {
      state.error = null
      state.paymentsOffer = [action.payload, ...state.paymentsOffer]
    },
    removePaymentOffer(state, action) {
      state.error = null
      state.paymentsOffer = state.paymentsOffer.filter((payment) => payment.id !== action.payload)
    },
    updatePaymentOffer(state, action) {
      state.error = null
      state.paymentsOffer = state.paymentsOffer.map((payment) =>
        payment.id === action.payload.id ? action.payload.payment : payment
      )
      
    },
    setError(state, action) {
      state.error = action.payload
    },
    setErrorValidation(state, action) {
      state.errorValidation = action.payload
    },
    setLoadingGet(state, action) {
      state.loadingGet = action.payload
    }
  }
})

export const paymentOfferReducer = paymentOfferSlice.reducer
export const paymentOfferActions = paymentOfferSlice.actions
