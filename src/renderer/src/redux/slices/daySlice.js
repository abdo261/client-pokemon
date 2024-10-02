import { createSlice } from '@reduxjs/toolkit'

const daySlice = createSlice({
  name: 'day',
  initialState: {
    days: [],
    day: null,
    error: null,
    errorValidation: null,
    loadingGet: false
  },
  reducers: {
    setDays(state, action) {
      state.error = null
      state.days = action.payload
    },
    setDay(state, action) {
      state.error = null
      state.day = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
    addDay(state, action) {
      state.error = null
      state.days = [action.payload, ...state.days]
    },
    removeDay(state, action) {
      state.error = null
      state.days = state.days.filter((day) => day.id !== action.payload)
      if (state.day && state.day.id === action.payload && !state.day.stopeAt) {
        state.day = null
      }
    },
    updateDay(state, action) {
      state.error = null
      state.days = state.days.map((day) => (day.id === action.payload.id ? action.payload : day))
      if (state.day && state.day.id === action.payload.id) {
        state.day = action.payload
      }
    },
    setErrorValidation(state, action) {
      state.errorValidation = action.payload
    },
    setLoadingGet(state, action) {
      state.loadingGet = action.payload
    }
  }
})

export const dayReducer = daySlice.reducer
export const dayActions = daySlice.actions
