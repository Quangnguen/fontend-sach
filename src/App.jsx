import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Shipping from './pages/Shipping'
import Detail from './pages/Detail'
import Login from './pages/Login'
import Register from './pages/Register'
import { useDispatch } from 'react-redux'
import CategoryShop from './pages/CategoryShop'
import SearchProducts from './pages/SearchProducts'
import ProtectUser from './utils/ProtectUser'
import Dashboard from './pages/Dashboard'
import Index from './components/dashboard/Index'

function App() {
  const dispatch = useDispatch()
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/products?" element={<CategoryShop />} />
        <Route path="/product/detail/:slug" element={<Detail />} />
        <Route path="/products/search?" element={<SearchProducts />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<ProtectUser />}>
          <Route path="" element={<Dashboard />}>
            <Route path="" element={<Index />} />
            {/* <Route path="my-orders" element={<Orders />} /> */}
            {/* <Route path="change-password" element={<ChangePassword />} /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
