import { Route } from 'react-router-dom'
import Layout from '../../layout/Layout'
import List from './list'
import Show from './show'
import Update from './Update'

export const offreRoutes = (
  <Route path="offers" element={<Layout />}>
    <Route index element={<List />} />
    <Route path="show/:id" element={<Show />} />
    <Route path="update/:id" element={<Update />} />
  </Route>
)
