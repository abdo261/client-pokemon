import { request } from '../../utils/axios'
import { categoryActions } from '../slices/categorySlice' // Adjust import path

// get All Categories
export const getCategories = () => async (dispatch) => {
  try {
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
  }
}

// get Category by ID
export const getCategoryById = (id) => async (dispatch) => {
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
  }
}
export const createCategory = (categoryData) => async (dispatch) => {
  try {
    const response = await request.post('/categories', categoryData)
    dispatch(categoryActions.addCategory(response.data))
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

// Update a Category by ID
export const updateCategory = (id, categoryData) => async (dispatch) => {
  try {
    const response = await request.put(`/categories/${id}`, categoryData)
    dispatch(categoryActions.updateCategory(response.data))
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

// Delete a Category by ID
export const deleteCategory = (id) => async (dispatch) => {
  try {
    await request.delete(`/categories/${id}`)
    dispatch(categoryActions.removeCategory(id))
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
