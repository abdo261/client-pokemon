import { configureStore } from '@reduxjs/toolkit'
import { categoryReducer } from './slices/categorySlice'
import { productReducer } from './slices/productSlice'
import { userReducer } from './slices/userSlice'
import { dayReducer } from './slices/daySlice'
import { offerReducer } from './slices/offerSlice'
import { paymentReducer } from './slices/paymentSlice'
import { paymentOfferReducer } from './slices/paymentOfferSlice'
import { paymentStatusReducer } from './slices/paymentStatusSlice'

const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    user: userReducer,
    day: dayReducer,
    offer: offerReducer,
    payment: paymentReducer,
    paymentOffer: paymentOfferReducer,
    paymentStatus: paymentStatusReducer
  }
})
export default store
