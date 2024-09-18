import { configureStore } from '@reduxjs/toolkit'
import { categoryReducer } from './slices/categorySlice'

const store = configureStore({
  reducer: { category: categoryReducer }
})
export default store
