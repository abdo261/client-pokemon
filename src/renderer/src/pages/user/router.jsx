import { Route } from 'react-router-dom'
import Layout from '../../layout/Layout'
import List from './list'

export const userRoutes = (
  <Route path="users" element={<Layout />}>
    <Route index element={<List />} />
  </Route>
)
