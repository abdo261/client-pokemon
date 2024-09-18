import { Route } from 'react-router-dom'
import Layout from '../../layout/Layout'
import List from './list'

export const invoiceRoutes = (
  <Route path="invoices" element={<Layout />}>
    <Route index element={<List />} />
  </Route>
)
