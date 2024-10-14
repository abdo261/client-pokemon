import { request } from '../../utils/axios'
import { userActions } from '../slices/userSlice'
import { toast } from 'react-toastify'

export const getUsers = () => async (dispatch) => {
  dispatch(userActions.setLoadingGet(true))
  dispatch(userActions.setUsers(null))

  try {
    const response = await request.get('/users')
    dispatch(userActions.setUsers(response.data))
  } catch (error) {
    dispatch(userActions.setUsers(null))

    if (error?.response) {
      dispatch(userActions.setError(error.response.data.message))
    } else {
      dispatch(
        userActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      )
    }
  } finally {
    dispatch(userActions.setLoadingGet(false))
  }
}

export const getUserById = (id) => async (dispatch) => {
  dispatch(userActions.setLoadingGet(true))
  dispatch(userActions.setUser(null))

  try {
    const response = await request.get(`/users/${id}`)
    dispatch(userActions.setUser(response.data))
  } catch (error) {
    dispatch(userActions.setUser(null))

    if (error?.response) {
      dispatch(userActions.setError(error.response.data.message))
    } else {
      dispatch(
        userActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      )
    }
  } finally {
    dispatch(userActions.setLoadingGet(false))
  }
}

export const createUser = (userData, cb, cbLoading) => async (dispatch) => {
  try {
    const response = await request.post('/users', userData)
    dispatch(userActions.addUser(response.data.user))
    toast.success(response.data.message)
    cb && cb()
  } catch (error) {
    if (error?.response) {
      if (error.response.status === 400) {
        toast.error('Validation error')
        dispatch(userActions.setErrorValidation(error.response.data))
      } else {
        toast.error(error.response.data.message)
      }
    } else {
      dispatch(
        userActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      )
      toast.error('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
    }
  } finally {
    cbLoading && cbLoading()
  }
}

// Update User by ID
export const updateUser = (id, userData, cb, cbLoading) => async (dispatch) => {
  try {
    const response = await request.put(`/users/${id}`, userData)
    dispatch(userActions.updateUser({ user: response.data.user, id }))
    toast.success(response.data.message)
    cb && cb()
  } catch (error) {
    if (error?.response) {
      if (error.response.status === 400) {
        toast.error('Validation error')
        dispatch(userActions.setErrorValidation(error.response.data))
      } else {
        dispatch(userActions.setError(error.response.data.message))
      }
    } else {
      toast.error('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
    }
  } finally {
    cbLoading && cbLoading()
  }
}

// Delete User by ID
export const deleteUser = (id, cb) => async (dispatch) => {
  try {
    const response = await request.delete(`/users/${id}`)
    dispatch(userActions.removeUser(id))
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

// Create Many Users
export const createManyUsers = (users) => async (dispatch) => {
  try {
    await request.post('/users/many', users)
    dispatch(getUsers())
  } catch (error) {
    if (error?.response) {
      dispatch(userActions.setError(error.response.data.message))
    } else {
      dispatch(
        userActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      )
    }
  }
}
