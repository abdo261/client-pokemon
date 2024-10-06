import { request } from '../../utils/axios'
import { paymentStatusActions } from '../slices/paymentStatusSlice'
import { toast } from 'react-toastify'

export const getPaymentsCountStatus = () => async (dispatch) => {
  dispatch(paymentStatusActions.setLoadingGet(true))
  dispatch(paymentStatusActions.setPaymentStatus(null))
  try {
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    const response = await request.get('/payment/status/countAll')
   
    dispatch(paymentStatusActions.setPaymentStatus(response.data))
  } catch (error) {
    dispatch(paymentStatusActions.setPaymentStatus(null))
    if (error?.response) {
      dispatch(paymentStatusActions.setError(error.response.data.message))
    } else {
      dispatch(
        paymentStatusActions.setError(
          'Le serveur est en panne, vérifiez si votre serveur est démarré ?'
        )
      )
    }
  } finally {
    dispatch(paymentStatusActions.setLoadingGet(false))
  }
}
export const getPaymentsCountByProductsStatus = () => async (dispatch) => {
  // dispatch(paymentStatusActions.setLoadingGet(true))
  dispatch(paymentStatusActions.setPaymentStatusProduts(null))
  try {
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    const response = await request.get('/payment/status/countByProducts')
   
    dispatch(paymentStatusActions.setPaymentStatusProduts(response.data))
  } catch (error) {
    dispatch(paymentStatusActions.setPaymentStatusProduts(null))
    if (error?.response) {
      dispatch(paymentStatusActions.setError(error.response.data.message))
    } else {
      dispatch(
        paymentStatusActions.setError(
          'Le serveur est en panne, vérifiez si votre serveur est démarré ?'
        )
      )
    }
  } finally {
    dispatch(paymentStatusActions.setLoadingGet(false))
  }
}
export const getPaymentsCountByOffersStatus = () => async (dispatch) => {
  // dispatch(paymentStatusActions.setLoadingGet(true))
  dispatch(paymentStatusActions.setPaymentStatusOffers(null))
  try {
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    const response = await request.get('/payment/status/countByOffers')

    dispatch(paymentStatusActions.setPaymentStatusOffers(response.data))
  } catch (error) {
    dispatch(paymentStatusActions.setPaymentStatusOffers(null))
    if (error?.response) {
      dispatch(paymentStatusActions.setError(error.response.data.message))
    } else {
      dispatch(
        paymentStatusActions.setError(
          'Le serveur est en panne, vérifiez si votre serveur est démarré ?'
        )
      )
    }
  } finally {
    dispatch(paymentStatusActions.setLoadingGet(false))
  }
}
// export const getCategoriesWithProducts = () => async (dispatch) => {
//   dispatch(paymentStatusActions.setLoadingGet(true))
//   dispatch(paymentStatusActions.setP(null))
//   try {
//     // await new Promise(resolve => setTimeout(resolve, 3000));
//     const response = await request.get('/categories/products')

//     dispatch(paymentStatusActions.setP(response.data))
//   } catch (error) {


//     if (error?.response) {
//       dispatch(paymentStatusActions.setError(error.response.data.message))
//     } else {
//       dispatch(
//         paymentStatusActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
//       )
//     }
//   } finally {
//     dispatch(paymentStatusActions.setLoadingGet(false))
//   }
// }
