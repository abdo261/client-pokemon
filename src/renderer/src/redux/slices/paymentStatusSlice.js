import { createSlice } from '@reduxjs/toolkit'

const payentStatusSlice = createSlice({
  name: 'payentStatus',
  initialState: {
    paymentStatus: null,
    paymentStatusProduts: null,
    paymentStatusOffers: null,
    loadingGet: false,
    error: null
  },
  reducers: {
    setPaymentStatus(state, action) {
      state.error = null
      state.paymentStatus = action.payload
    },
    setPaymentStatusProduts(state, action) {
      state.error = null
      state.paymentStatusProduts = action.payload
    },
    setPaymentStatusOffers(state, action) {
      state.error = null
      state.paymentStatusOffers = action.payload
    },
    setLoadingGet(state, action) {
      state.loadingGet = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    }
  }
})

export const paymentStatusReducer = payentStatusSlice.reducer
export const paymentStatusActions = payentStatusSlice.actions
