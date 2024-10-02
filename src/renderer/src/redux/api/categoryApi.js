import { request } from '../../utils/axios'
import { categoryActions } from '../slices/categorySlice' // Adjust import path
import { toast } from 'react-toastify'
// get All Categories
export const getCategories = () => async (dispatch) => {
  dispatch(categoryActions.setLoadingGet(true))
  dispatch(categoryActions.setCategories(null))
  try {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const response = await request.get('/categories')
    console.log(response)
    dispatch(categoryActions.setCategories(response.data))
  } catch (error) {
    console.log(error)

    if (error?.response) {
      dispatch(categoryActions.setError(error.response.data.message))
    } else {
      dispatch(
        categoryActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      )
    }
  } finally {
    dispatch(categoryActions.setLoadingGet(false))
  }
}
export const getCategoriesCounts = () => async (dispatch) => {
  dispatch(categoryActions.setLoadingGet(true))
  dispatch(categoryActions.setCategories(null))
  try {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const response = await request.get('/categories/counts')
    console.log(response)
    dispatch(categoryActions.setCategories(response.data))
  } catch (error) {
    console.log(error)

    if (error?.response) {
      dispatch(categoryActions.setError(error.response.data.message))
    } else {
      dispatch(
        categoryActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      )
    }
  } finally {
    dispatch(categoryActions.setLoadingGet(false))
  }
}

// get Category by ID
export const getCategoryById = (id) => async (dispatch) => {
  dispatch(categoryActions.setLoadingGet(true))
  dispatch(categoryActions.setCategory(null))

  try {
    const response = await request.get(`/categories/${id}`)
    dispatch(categoryActions.setCategory(response.data))
  } catch (error) {
    if (error?.response) {
      dispatch(categoryActions.setError(error.response.data.message))
    } else {
      dispatch(
        categoryActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      )
    }
  } finally {
    dispatch(categoryActions.setLoadingGet(false))
  }
}
export const createCategory = (categoryData, cb, cbLoading) => async (dispatch) => {
  try {
    const response = await request.post('/categories', categoryData)
    dispatch(categoryActions.addCategory({ ...response.data.category, _count: { products: 0 } }))
    toast.success(response.data.message)
    cb && cb()
  } catch (error) {
    console.log(error)
    if (error?.response) {
      if (error.response.status === 400) {
        toast.error('error validation')
        dispatch(categoryActions.setErrorValidatoon(error.response.data))
      } else {
        dispatch(categoryActions.setError(error.response.data.message))
      }
    } else {
      dispatch(
        categoryActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      )
      toast.error('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
    }
  } finally {
    cbLoading && cbLoading()
  }
}

// Update a Category by ID
export const updateCategory = (id, categoryData, cb, cbLoading) => async (dispatch) => {
  try {
    const response = await request.put(`/categories/${id}`, categoryData)
    dispatch(categoryActions.updateCategory({ category: response.data.category, id }))
    toast.success(response.data.message)
    console.log(response.data)
    cb && cb()
  } catch (error) {
    console.log(error)
    if (error?.response) {
      if (error.response.status === 400) {
        toast.error('ereur de validation')
        dispatch(categoryActions.setErrorValidatoon(error.response.data))
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

// Delete a Category by ID
export const deleteCategory = (id) => async (dispatch) => {
  try {
    const response = await request.delete(`/categories/${id}`)
    dispatch(categoryActions.removeCategory(id))
    toast.success(response.data.message)
  } catch (error) {
    if (error?.response) {
      toast.error(error.response.data.message)
    } else {
      toast.error('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
    }
  }
}

export const createManyCategories = (categories) => async (dispatch) => {
  try {
    await request.post('categories/many', categories)
    dispatch(getCategories())
  } catch (error) {
    if (error?.response) {
      dispatch(categoryActions.setError(error.response.data.message))
    } else {
      dispatch(
        categoryActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      )
    }
  }
}
