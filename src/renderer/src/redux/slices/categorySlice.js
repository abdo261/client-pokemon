import { createSlice } from '@reduxjs/toolkit'

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    category: null,
    error: null,
    errorValidation: null,
    loadingGet:false
  },
  reducers: {
    setCategories(state, action) {
      state.error = null
      state.categories = action.payload
    },
    setCategory(state, action) {
      state.error = null
      state.category = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
    addCategory(state, action) {
      state.error = null
      state.categories = [action.payload, ...state.categories]
    },
    removeCategory(state, action) {
      state.error = null
      state.categories = state.categories.filter((category) => category.id !== action.payload)
    },
    updateCategory(state, action) {
      state.error = null
      state.categories = state.categories.map((category) =>
        category.id === action.payload.id ? action.payload : category
      )
      if (state.category && state.category.id === action.payload.id) {
        state.category = action.payload
      }
    },
    setErrorValidatoon(state,action){
      state.errorValidation = action.payload
    },
    setLoadingGet(state,action){
      state.loadingGet=action.payload
    }
  }
})

export const categoryReducer = categorySlice.reducer
export const categoryActions = categorySlice.actions
