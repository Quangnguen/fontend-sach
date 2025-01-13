import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Shipping from './pages/Shipping'
import Detail from './pages/Detail'
// import Login from './pages/Login'
// import Register from './pages/Register'
import CategoryShop from './pages/CategoryShop'
import SearchProducts from './pages/SearchProducts'

function App() {
  
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

        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}

       
      </Routes>
    </BrowserRouter>
  )
}

export default App
