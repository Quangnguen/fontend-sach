import React, { useEffect } from 'react'
import { FaEye } from 'react-icons/fa'
import { RiShoppingCartLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProduct } from '../../store/reducers/cartReducer'
import { formatCurrency } from './../../utils/format'

const ShopProducts = ({ styles, products }) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

   useEffect(() => {
     localStorage.setItem('cart', JSON.stringify(cart)) // Lưu giỏ hàng vào localStorage
   }, [cart])

  // const add_wishlist = (pro) => {
  //   dispatch(
  //     add_to_wishlist({
  //       userId: userInfo.id,
  //       productId: pro.id,
  //       name: pro.name,
  //       price: pro.price,
  //       image: pro.imageFileName,
  //     })
  //   )
  // }

  const handleAddProduct = (product) => {
    dispatch(addProduct(product)) // Dispatch action thêm sản phẩm
    console.log('product', product)
  }

  return (
    <div
      className={`w-full grid ${
        styles === 'grid'
          ? 'grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2'
          : 'grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2'
      } gap-3 `}
    >
      {products.map((p, i) => (
        <div
          key={i}
          className={`flex transition-all duration-1000 hover:shadow-md hover:-translate-y-3 ${
            styles === 'grid'
              ? 'flex-col justify-start items-start'
              : 'justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start'
          } w-full gap-4 bg-white p-1 rounded-md`}
        >
          <div
            className={
              styles === 'grid'
                ? 'w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden'
                : 'md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden'
            }
          >
            <img
              className="h-[360px] rounded-md md:h-[270px] xs:h-[170px] w-full object-cover"
              src={`https://ahoang.onrender.com/api/ImageUpload/get/${p.imageFileName}`}
              alt=""
            />

            <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
              {/* <li
                onClick={add_wishlist(p)}
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
              >
                <FaRegHeart />
              </li> */}
              <Link
                to={`/product/detail/${p.id}`}
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
              >
                <FaEye />
              </Link>
              <li
                onClick={() =>
                  handleAddProduct({
                    id: p.id,
                    image: p.imageFileName,
                    name: p.name,
                    price: p.price,
                    quantity: 1
                  })
                }
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
              >
                <RiShoppingCartLine />
              </li>
            </ul>
          </div>

          <div className="flex justify-start items-start flex-col gap-1">
            <h2 className="font-bold">{p.name}</h2>
            <div className="flex justify-start items-center gap-3">
              <span className="text-md font-semibold">
                {formatCurrency(p.price)}
              </span>
              <div className="flex">{/* <Rating ratings={p.rating} /> */}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ShopProducts
