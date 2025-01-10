import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Shipping from './pages/Shipping'
import Detail from './pages/Detail'
import Login from './pages/Login'
import Register from './pages/Register'
import { get_categories } from './store/reducers/homeReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import CategoryShop from './pages/CategoryShop'
import SearchProducts from './pages/SearchProducts'
import ProtectUser from './utils/ProtectUser'
import Dashboard from './pages/Dashboard'
import Index from './components/dashboard/Index'
import Orders from './components/dashboard/Order'
import ChangePassword from './components/dashboard/ChangePassword'
// import Wishlist from './components/dashboard/Wishlist'
import OrderDetails from './components/dashboard/OrderDetail'
import ConfirmOrder from './pages/ConfirmOrder'

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
