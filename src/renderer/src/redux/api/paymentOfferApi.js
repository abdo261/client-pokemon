import { toast } from 'react-toastify'
import { request } from '../../utils/axios'
import { paymentOfferActions } from '../slices/paymentOfferSlice'

// Get all payments
export const getPaymentsOffer = () => async (dispatch) => {
  dispatch(paymentOfferActions.setLoadingGet(true))
  dispatch(paymentOfferActions.setPaymentsOffer(null))

  try {
    const response = await request.get('/paymentsOffer')

    dispatch(paymentOfferActions.setPaymentsOffer(response.data))
  } catch (error) {
    dispatch(paymentOfferActions.setPaymentsOffer(null))
    if (error?.response) {
      dispatch(paymentOfferActions.setError(error.response.data.message))
    } else {
      dispatch(
        paymentOfferActions.setError(
          'Le serveur est en panne, vérifiez si votre serveur est démarré ?'
        )
      )
    }
  } finally {
    dispatch(paymentOfferActions.setLoadingGet(false))
  }
}
export const getPaymentOfferById = (id) => async (dispatch) => {
  dispatch(paymentOfferActions.setLoadingGet(true))
  dispatch(paymentOfferActions.setPaymentOffer(null))

  try {
    const response = await request.get(`/paymentsOffer/${id}`)
    dispatch(paymentOfferActions.setPaymentOffer(response.data))
  } catch (error) {
    dispatch(paymentOfferActions.setPaymentOffer(null))
    if (error?.response) {
      dispatch(paymentOfferActions.setError(error.response.data.message))
    } else {
      dispatch(
        paymentOfferActions.setError(
          'Le serveur est en panne, vérifiez si votre serveur est démarré ?'
        )
      )
    }
  } finally {
    dispatch(paymentOfferActions.setLoadingGet(false))
  }
}
export const createPaymentOffer = (paymentData, cb, cbLoading) => async (dispatch) => {
  try {
    const response = await request.post('/paymentsOffer', paymentData)
    dispatch(paymentOfferActions.addPaymentOffer(response.data.paymentOffer))
    toast.success('Paiement créé avec succès')
    cb && cb(response.data.paymentOffer)
  } catch (error) {
    console.log(error)
    if (error?.response) {
      if (error.response.status === 400) {
        toast.error('Erreur de validation')
        dispatch(paymentOfferActions.setErrorValidation(error.response.data))
      } else {
        toast.error(paymentOfferActions.setError(error.response.data.message))
      }
    } else {
      dispatch(
        paymentOfferActions.setError(
          'Le serveur est en panne, vérifiez si votre serveur est démarré ?'
        )
      )
      toast.error('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
    }
  } finally {
    cbLoading && cbLoading()
  }
}
export const updatePaymentOffer = (id, paymentData, cb, cbLoading) => async (dispatch) => {
  try {
    // await new Promise(resolve =>setTimeout(resolve,5000))

    const response = await request.put(`/paymentsOffer/${id}`, paymentData)
    dispatch(paymentOfferActions.updatePaymentOffer({ payment: response.data.paymentOffer, id }))
    toast.success('Paiement mis à jour avec succès')
    cb && cb()
  } catch (error) {
    if (error?.response) {
      if (error.response.status === 400) {
        toast.error('Erreur de validation')
        dispatch(paymentOfferActions.setErrorValidation(error.response.data))
      } else {
        toast.error(error.response.data.message)
      }
    } else {
      toast.error('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
    }
  } finally {
    cbLoading && cbLoading()
  }
}
export const deletePaymentOffer = (id, cb) => async (dispatch) => {
  try {
    const response = await request.delete(`/paymentsOffer/${id}`)
    dispatch(paymentOfferActions.removePaymentOffer(id))
    toast.success('Paiement supprimé avec succès')
    cb && cb()
  } catch (error) {
    console.log(error)
    if (error?.response) {
      toast.error(error.response.data.message)
    } else {
      toast.error('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
    }
  }
}
