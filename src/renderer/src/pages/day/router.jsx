import { Route } from 'react-router-dom'
import Layout from '../../layout/Layout'
import List from './List'
import Show from './Show'
import Update from './Update'

export const dayRoutes = (
  <Route path="days" element={<Layout />}>
    <Route index element={<List />} />
    <Route path='show/:id' element={<Show />} />
    <Route path='update/:id' element={<Update />} />
  </Route>
)
