import { request } from '../../utils/axios'
import { dayActions } from '../slices/daySlice' // Adjust import path
import { toast } from 'react-toastify'

// Get All Days
export const getDays = () => async (dispatch) => {
  dispatch(dayActions.setLoadingGet(true))
  dispatch(dayActions.setDays(null))
  try {
    const response = await request.get('/days')
    dispatch(dayActions.setDays(response.data))
  } catch (error) {
    if (error?.response) {
      dispatch(dayActions.setError(error.response.data.message))
    } else {
      dispatch(
        dayActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      )
    }
  } finally {
    dispatch(dayActions.setLoadingGet(false))
  }
}

// Get Day by ID
export const getDayById = (id) => async (dispatch) => {
  dispatch(dayActions.setLoadingGet(true))
  dispatch(dayActions.setDay(null))

  try {
    const response = await request.get(`/days/${id}`)
    dispatch(dayActions.setDay(response.data))
  } catch (error) {
    if (error?.response) {
      dispatch(dayActions.setError(error.response.data.message))
    } else {
      dispatch(
        dayActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      )
    }
  } finally {
    dispatch(dayActions.setLoadingGet(false))
  }
}
// Get Day by ID
export const getLatestDay = () => async (dispatch) => {
  dispatch(dayActions.setLoadingGet(true))
  dispatch(dayActions.setDay(null))

  try {
    const response = await request.get(`/days/latest`)

    dispatch(dayActions.setDay(response.data))
  } catch (error) {
    if (error?.response) {
      dispatch(dayActions.setError(error.response.data.message))
    } else {
      dispatch(
        dayActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      )
    }
  } finally {
    dispatch(dayActions.setLoadingGet(false))
  }
}

// Create a Day
export const createDay = (dayData, cb, cbLoading) => async (dispatch) => {
  try {
    const response = await request.post('/days', dayData)
    dispatch(dayActions.addDay(response.data.day))
    dispatch(dayActions.setDay(response.data.day))
    toast.success(response.data.message)
    cb && cb()
  } catch (error) {
    if (error?.response) {
      dispatch(dayActions.setError(error.response.data.message))
    } else {
      dispatch(
        dayActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      )
    }
  } finally {
    cbLoading && cbLoading()
  }
}

// Update a Day by ID
export const stopeDay = (id, dayData, cb, cbLoading) => async (dispatch) => {
  try {
    const response = await request.put(`/days/${id}`, dayData)

    dispatch(dayActions.updateDay({ ...response.data.day }))
    dispatch(dayActions.setDay(null))
    toast.success(response.data.message)
    cb && cb()
  } catch (error) {
    if (error?.response) {
      dispatch(dayActions.setError(error.response.data.message))
    } else {
      dispatch(
        dayActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      )
    }
  } finally {
    cbLoading && cbLoading()
  }
}

// Delete a Day by ID
export const deleteDay = (id) => async (dispatch) => {
  try {
    const response = await request.delete(`/days/${id}`)
    dispatch(dayActions.removeDay(id))
    toast.success(response.data.message)
  } catch (error) {
    if (error?.response) {
      toast.error(error.response.data.message)
    } else {
      toast.error('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
    }
  }
}

// Create Many Days
export const createManyDays = (days) => async (dispatch) => {
  try {
    await request.post('days/many', days)
    dispatch(getDays())
  } catch (error) {
    if (error?.response) {
      dispatch(dayActions.setError(error.response.data.message))
    } else {
      dispatch(
        dayActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      )
    }
  }
}
