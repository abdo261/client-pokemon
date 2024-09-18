import { Route } from 'react-router-dom'
import Layout from '../../layout/Layout'

import Index from './Index'

export const commandeRoutes = (
  <Route path="commandes" element={<Layout />}>
    <Route index element={<Index />} />
  </Route>
)
