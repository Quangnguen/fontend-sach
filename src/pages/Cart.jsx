import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import bannerImage from '../assets/images/banner/shop.png'

import toast from 'react-hot-toast'
import { formatCurrency } from '../utils/format'
import { deleteProduct, updateQuantity } from '../store/reducers/cartReducer'

const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart)) // Lưu giỏ hàng vào localStorage
  }, [cart]) // Lắng nghe sự thay đổi của cart để cập nhật localStorage

  const navigate = useNavigate()

  const redirect = () => {
    navigate('/shipping')
  }

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      dispatch(deleteProduct(productId)) // Nếu số lượng bằng 0 thì xóa sản phẩm
    } else {
      dispatch(updateQuantity({ id: productId, quantity })) // Dispatch action cập nhật số lượng
    }
  }

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId)) // Dispatch action xóa sản phẩm
  }

  console.log(cart)

  return (
    <div>
      <Header />
      <section
        className="h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left"
        style={{ backgroundImage: `url(${bannerImage})` }} // Use the imported image
      >
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">Giỏ hàng</h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Trang chủ</Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span>Giỏ hàng</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
          {cart.length > 0 ? (
            <div className="flex flex-wrap">
              <div className="w-[67%] md-lg:w-full">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="bg-white p-4">
                      <h2 className="text-md text-green-500 font-semibold">
                        Giỏ hàng của bạn
                      </h2>
                    </div>

                    {cart.map((pt, i) => (
                      <div className="w-full flex flex-wrap">
                        <div className="flex sm:w-full gap-2 w-7/12">
                          <div className="flex gap-2 justify-start items-center">
                            <img
                              className="w-[80px] h-[80px]"
                              src={`https://ahoang.onrender.com/api/ImageUpload/get/${pt.image}`}
                              alt=""
                            />
                            <div className=" text-slate-600">
                              <h2 className="text-md font-semibold">
                                {pt.name}{' '}
                              </h2>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center w-5/12 sm:w-full sm:mt-3">
                          <h2 className="text-lg text-orange-500">
                            {formatCurrency(parseInt(pt.price))}
                          </h2>
                          <div className="flex gap-2 flex-col">
                            <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                              <div
                                onClick={() =>
                                  handleUpdateQuantity(pt.id, pt.quantity - 1)
                                }
                                className="px-3 cursor-pointer"
                              >
                                -
                              </div>
                              <div className="px-3">{pt.quantity}</div>
                              <div
                                onClick={() =>
                                  handleUpdateQuantity(pt.id, pt.quantity + 1)
                                }
                                className="px-3 cursor-pointer"
                              >
                                +
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                dispatch(() => handleDeleteProduct(pt.id))
                              }
                              className="px-5 py-[3px] bg-red-500 text-white"
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-[33%] md-lg:w-full">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  {cart.length > 0 && (
                    <div className="bg-white p-3 text-slate-600 flex flex-col gap-3">
                      <h2 className="text-xl font-bold">Đặt hàng</h2>
                      <div className="flex justify-between items-center">
                        <span>{cart.length} sản phẩm </span>
                        {/* <span>{formatCurrency(parseInt(totalPrice))} </span> */}
                      </div>
                      {/* <div className="flex justify-between items-center">
                        <span>Shipping Fee </span>
                        <span>{shipping_fee} </span>
                      </div> */}
                      <div className="flex gap-2">
                        <input
                          className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-500 rounded-sm"
                          type="text"
                          placeholder="Nhập mã giảm giá"
                        />
                        <button className="px-5 py-[1px] bg-[#059473] text-white rounded-sm uppercase text-sm">
                          Áp dụng
                        </button>
                      </div>

                      <div className="flex justify-between items-center">
                        <span>Tổng</span>
                        <span className="text-lg text-[#059473]">
                          {/* {formatCurrency(parseInt(totalPrice))} */}
                        </span>
                      </div>
                      <button
                        onClick={redirect}
                        className="px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg bg-red-500 text-sm text-white uppercase "
                      >
                        Đặt hàng ngay
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link className="px-4 py-1 bg-indigo-500 text-white" to="/shop">
                Cửa hàng
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Cart
