import { request } from '../../utils/axios';
import { productActions } from '../slices/productSlice'; // Adjust the import path
import { toast } from 'react-toastify';

// Récupérer tous les produits
export const getProducts = () => async (dispatch) => {
  dispatch(productActions.setLoadingGet(true));
  dispatch(productActions.setProducts(null));

  try {
    const response = await request.get('/products');
    dispatch(productActions.setProducts(response.data));
  } catch (error) {
    if (error?.response) {
      dispatch(productActions.setError(error.response.data.message));
    } else {
      dispatch(
        productActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      );
    }
  } finally {
    dispatch(productActions.setLoadingGet(false));
  }
};

// Récupérer un produit par ID
export const getProductById = (id) => async (dispatch) => {
  dispatch(productActions.setLoadingGet(true));
  dispatch(productActions.setProduct(null));

  try {
    const response = await request.get(`/products/${id}`);
    dispatch(productActions.setProduct(response.data));
  } catch (error) {
    if (error?.response) {
      dispatch(productActions.setError(error.response.data.message));
    } else {
      dispatch(
        productActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      );
    }
  } finally {
    dispatch(productActions.setLoadingGet(false));
  }
};

// Créer un nouveau produit
export const createProduct = (productData, cb, cbLoading) => async (dispatch) => {
  try {
    const response = await request.post('/products', productData);
    dispatch(productActions.addProduct({ ...response.data.product}));
    toast.success('Produit créé avec succès');
    cb && cb();
  } catch (error) {
    if (error?.response) {
      if (error.response.status === 400) {
        toast.error('Erreur de validation');
        dispatch(productActions.setErrorValidation(error.response.data));
      } else {
        dispatch(productActions.setError(error.response.data.message));
      }
    } else {
      dispatch(
        productActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      );
      toast.error('Le serveur est en panne, vérifiez si votre serveur est démarré ?');
    }
  } finally {
    cbLoading && cbLoading();
  }
};

// Mettre à jour un produit par ID
export const updateProduct = (id, productData, cb, cbLoading) => async (dispatch) => {
  try {
    const response = await request.put(`/products/${id}`, productData);
    dispatch(productActions.updateProduct({ product: response.data.product, id }));
    toast.success('Produit mis à jour avec succès');
    cb && cb();
  } catch (error) {
    if (error?.response) {
      if (error.response.status === 400) {
        toast.error('Erreur de validation');
        dispatch(productActions.setErrorValidation(error.response.data));
      } else {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error('Le serveur est en panne, vérifiez si votre serveur est démarré ?');
    }
  } finally {
    cbLoading && cbLoading();
  }
};

// Supprimer un produit par ID
export const deleteProduct = (id,cb) => async (dispatch) => {
  try {
    const response = await request.delete(`/products/${id}`);
    dispatch(productActions.removeProduct(id));
    toast.success('Produit supprimé avec succès');
    cb && cb()
  } catch (error) {
    if (error?.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error('Le serveur est en panne, vérifiez si votre serveur est démarré ?');
    }
  }
};

export const createManyProducts = (products) => async (dispatch) => {
  try {
    await request.post('/products/many', products);
    dispatch(getProducts());
  } catch (error) {
    if (error?.response) {
      dispatch(productActions.setError(error.response.data.message));
    } else {
      dispatch(
        productActions.setError('Le serveur est en panne, vérifiez si votre serveur est démarré ?')
      );
    }
  }
};
