import { configureStore } from '@reduxjs/toolkit'
import { categoryReducer } from './slices/categorySlice'
import { productReducer } from './slices/productSlice'
import { userReducer } from './slices/userSlice'
import { dayReducer } from './slices/daySlice'

const store = configureStore({
  reducer: { category: categoryReducer, product: productReducer,user:userReducer,day:dayReducer }
})
export default store
