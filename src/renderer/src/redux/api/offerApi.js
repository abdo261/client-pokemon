import { request } from '../../utils/axios'
import { offerActions } from '../slices/offerSlice' // Adjust import path
import { toast } from 'react-toastify'

// Get All Offers
export const getOffers = () => async (dispatch) => {
  dispatch(offerActions.setLoadingGet(true))
  dispatch(offerActions.setOffers(null))
  try {
    const response = await request.get('/offers')
    dispatch(offerActions.setOffers(response.data))
 
  } catch (error) {
    dispatch(offerActions.setOffers(null))
    if (error?.response) {
      dispatch(offerActions.setError(error.response.data.message))
    } else {
      dispatch(
        offerActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      )
    }
  } finally {
    dispatch(offerActions.setLoadingGet(false))
  }
}

// Get Offer by ID
export const getOfferById = (id) => async (dispatch) => {
  dispatch(offerActions.setLoadingGet(true))
  dispatch(offerActions.setOffer(null))
  try {
    const response = await request.get(`/offers/${id}`)
    dispatch(offerActions.setOffer(response.data))
  } catch (error) {
    dispatch(offerActions.setOffer(null))
    if (error?.response) {
      dispatch(offerActions.setError(error.response.data.message))
    } else {
      dispatch(
        offerActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      )
    }
  } finally {
    dispatch(offerActions.setLoadingGet(false))
  }
}

// Create Offer
export const createOffer = (offerData, cb, cbLoading) => async (dispatch) => {
  try {
    const response = await request.post('/offers', offerData)
    console.log(response.data.offer)
    dispatch(offerActions.addOffer(response.data.offer))
    toast.success(response.data.message)
    cb && cb()
  } catch (error) {


    if (error?.response) {
      if (error.response.status === 400) {
        toast.error('error validation')
        dispatch(offerActions.setErrorValidation(error.response.data))
      } else {
        dispatch(offerActions.setError(error.response.data.message))
      }
    } else {
      dispatch(
        offerActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      )
    }
  } finally {
    cbLoading && cbLoading()
  }
}

// Update Offer
export const updateOffer = (id, offerData, cb, cbLoading) => async (dispatch) => {
  try {
    const response = await request.put(`/offers/${id}`, offerData)
    dispatch(offerActions.updateOffer({ offer: response.data.offer, id }))
    toast.success(response.data.message)
    cb && cb()
  } catch (error) {
    if (error?.response) {
      if (error.response.status === 400) {
        toast.error('erreur de validation')
        dispatch(offerActions.setErrorValidation(error.response.data))
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

// Delete Offer
export const deleteOffer = (id, cb) => async (dispatch) => {
  try {
    const response = await request.delete(`/offers/${id}`)
    dispatch(offerActions.removeOffer(id))
    toast.success(response.data.message)
    cb && cb()
  } catch (error) {
    if (error?.response) {
      toast.error(error.response.data.message)
    } else {
      toast.error('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
    }
  }
}

// Create Many Offers
export const createManyOffers = (offers) => async (dispatch) => {
  try {
    await request.post('offers/many', offers)
    dispatch(getOffers())
  } catch (error) {
    if (error?.response) {
      dispatch(offerActions.setError(error.response.data.message))
    } else {
      dispatch(
        offerActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      )
    }
  }
}
