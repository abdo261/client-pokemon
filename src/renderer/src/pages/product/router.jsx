import { Route } from 'react-router-dom'
import Layout from '../../layout/Layout'
import List from './list'
import Update from './Update'

export const productRoutes = (
  <Route path="products" element={<Layout />}>
    <Route index element={<List />} />
    <Route path="update/:id" element={<Update />} />
  </Route>
)
