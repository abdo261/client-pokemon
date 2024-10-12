import { toast } from 'react-toastify'
import { request } from '../../utils/axios' 
import { paymentActions } from '../slices/paymentSlice'

// Get all payments
export const getPayments = () => async (dispatch) => {
  dispatch(paymentActions.setLoadingGet(true))
  dispatch(paymentActions.setPayments(null))

  try {
    const response = await request.get('/payments')
    dispatch(paymentActions.setPayments(response.data))
  } catch (error) {
    dispatch(paymentActions.setPayments(null))
    if (error?.response) {
      dispatch(paymentActions.setError(error.response.data.message))
    } else {
      dispatch(
        paymentActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      )
    }
  } finally {
    dispatch(paymentActions.setLoadingGet(false))
  }
}
export const getPaymentById = (id) => async (dispatch) => {
  dispatch(paymentActions.setLoadingGet(true))
  dispatch(paymentActions.setPayment(null))

  try {
    const response = await request.get(`/payments/${id}`)
    dispatch(paymentActions.setPayment(response.data))
  } catch (error) {
    dispatch(paymentActions.setPayment(null))
    if (error?.response) {
      dispatch(paymentActions.setError(error.response.data.message))
    } else {
      dispatch(
        paymentActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      )
    }
  } finally {
    dispatch(paymentActions.setLoadingGet(false))
  }
}
export const createPayment = (paymentData, cb, cbLoading) => async (dispatch) => {
  try {
    const response = await request.post('/payments', paymentData)
    dispatch(paymentActions.addPayment({ ...response.data.payment }))
    toast.success('Paiement créé avec succès')
    cb && cb(response.data.payment)
  } catch (error) {
    console.log(error)
    if (error?.response) {
      if (error.response.status === 400) {
        toast.error('Erreur de validation')
        dispatch(paymentActions.setErrorValidation(error.response.data))
      } else {
        toast.error(paymentActions.setError(error.response.data.message))
      }
    } else {
      dispatch(
        paymentActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      )
      toast.error('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
    }
  } finally {
    cbLoading && cbLoading()
  }
}
export const updatePayment = (id, paymentData, cb, cbLoading) => async (dispatch) => {
  try {
    // await new Promise(resolve =>setTimeout(resolve,5000))
    const response = await request.put(`/payments/${id}`, paymentData)
    dispatch(paymentActions.updatePayment({ payment: response.data.payment, id }))
    console.log(response.data.payment)
    toast.success('Paiement mis à jour avec succès')
    cb && cb()
  } catch (error) {
    console.log(error)
    if (error?.response) {
      if (error.response.status === 400) {
        toast.error('Erreur de validation')
        dispatch(paymentActions.setErrorValidation(error.response.data))
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
export const deletePayment = (id, cb) => async (dispatch) => {
  try {
    const response = await request.delete(`/payments/${id}`)
    dispatch(paymentActions.removePayment(id))
    toast.success('Paiement supprimé avec succès')
    cb && cb()
  } catch (error) {
    if (error?.response) {
      toast.error(error.response.data.message)
    } else {
      toast.error('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
    }
  }
}
