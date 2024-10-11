import { toast } from 'react-toastify'

import { authActions } from '../slices/authSlice'
import { request } from '../../utils/axios'

export const loginUser = (formData, cb) => async (dispatch) => {
  dispatch(authActions.setLoading(true))
  dispatch(authActions.setError(null))
  dispatch(authActions.setUser(null))
  try {
    const response = await request.post('/auth/login', formData)
    console.log(response)
    if (response.status === 200) {
      dispatch(authActions.setUser(response.data.user))
      localStorage.setItem(
        'session_user',
        JSON.stringify({ user: response.data.user, token: response.data.token })
      )
      toast.success(response.data.message)
      cb && cb()
    }
  } catch (error) {
  
    if (error?.response?.status === 400) {
      dispatch(authActions.setErrorValidation(error.response.data))
      toast.error('Ereur de validation !')
    } else if (error?.response?.status === 401) {
      dispatch(authActions.setErrorValidation(error.response.data))
      toast.error('Email ou mot de passe invalide !')
    } else if (error?.response?.status === 401 || error?.response?.status === 500) {
      toast.error(error.response.data.message)
    } else {
      toast.error('Le serveur est en panne, vérifiez si votre serveur est démarré ?', {
        autoClose: false
      })
    }
  } finally {
    dispatch(authActions.setLoading(false))
  }
}

export const logoutUser = (cb) => async (dispatch) => {
  dispatch(authActions.logOutUser())
  localStorage.removeItem('session_user')
  cb && cb()
}
