import 'react-toastify/dist/ReactToastify.css'

import { Route, Routes, HashRouter as Router, BrowserRouter } from 'react-router-dom'
import { categoryRoutes } from './pages/category/router'
import Layout from './layout/Layout'
import Home from './pages/home/Home'
import { invoiceRoutes } from './pages/invoice/router'
import { commandeRoutes } from './pages/commande/router'
import { productRoutes } from './pages/product/router'
import { userRoutes } from './pages/user/router'
import Settings from './pages/settings/Settings'
import { dayRoutes } from './pages/day/router'
import { offreRoutes } from './pages/offre/router'

function App() {
  // const api = import.meta.env.VITE_API_URI
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/settings" element={<Layout />}>
          <Route index element={<Settings />} />
        </Route>
        {categoryRoutes}
        {invoiceRoutes}
        {commandeRoutes}
        {productRoutes}
        {userRoutes}
        {dayRoutes}
        {offreRoutes}
      </Routes>
    </Router>
  )
}

export default App
