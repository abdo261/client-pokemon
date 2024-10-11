import 'react-toastify/dist/ReactToastify.css'

import { Route, Routes, HashRouter as Router, BrowserRouter, Navigate } from 'react-router-dom'
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
import Sharts from './pages/charts/Sharts'
import { orderRoutes } from './pages/order/routes'
import Login from './pages/auth/Login'
import { useSelector } from 'react-redux'

function App() {
  // const api = import.meta.env.VITE_API_URI
  const { user } = useSelector((state) => state.auth)
  console.log(user)
  return (
    <Router>
      <Routes>
        {user ? (
          <>
           
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="/settings" element={<Layout />}>
              <Route index element={<Settings />} />
            </Route>
            <Route path="/sharts" element={<Layout />}>
              <Route index element={<Sharts />} />
            </Route>
            {categoryRoutes}
            {invoiceRoutes}
            {commandeRoutes}
            {productRoutes}
            {userRoutes}
            {dayRoutes}
            {offreRoutes}
            {orderRoutes}
            <Route path="/*" element={<Navigate to='/' />} />

          </>
        ) : (
          <>
        
            <Route path="/auth/login" element={<Login />} />
            <Route path="/*" element={<Navigate to='/auth/login' />} />

          </>
        )}
      </Routes>
    </Router>
  )
}

export default App
