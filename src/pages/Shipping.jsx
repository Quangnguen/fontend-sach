import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'

import { formatCurrency } from '../utils/format'
import { messageClear, place_order } from './../store/reducers/orderReducer'
import { useDispatch, useSelector } from 'react-redux'
import { email } from '../utils/email'
import toast from 'react-hot-toast'
import bannerImage from '../assets/images/banner/shop.png'

const Shipping = () => {
  const [res, setRes] = useState(false)
  const [state, setState] = useState({
    name: '',
    address: '',
    phone: '',
    post: '',
    province: '',
    city: '',
    area: '',
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { successMessage, errorMessage } = useSelector((state) => state.order)
  const cart = useSelector((state) => state.cart)

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  useEffect(() => {
    // Đảm bảo không gọi lại `setItem` quá nhiều lần
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    // Thực hiện các thay đổi ở đây
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart]) // Dùng useEffect chỉ khi cart thay đổi

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage)
      localStorage.clear()
      dispatch(messageClear())
      navigate('/')
    }

    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  }, [successMessage, errorMessage])

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const cartHTML = cart
    .map(
      (item) => `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${formatCurrency(item.price)}</td>
        <td>${formatCurrency(item.price * item.quantity)}</td>
      </tr>`
    )
    .join('')

  const emailContent = `
  <div>
    <h2>Thông tin đơn hàng</h2>
    <p><b>Người đặt hàng:</b> ${state.name}</p>
    <p><b>Địa chỉ:</b> ${state.address}, ${state.province}, ${state.city}, ${
    state.area
  }</p>
    <p><b>Số điện thoại:</b> ${state.phone}</p>
    <p><b>Mã bưu điện:</b> ${state.post}</p>
    <h3>Chi tiết sản phẩm:</h3>
    <table border="1" cellspacing="0" cellpadding="5">
      <thead>
        <tr>
          <th>Tên sản phẩm</th>
          <th>Số lượng</th>
          <th>Đơn giá</th>
          <th>Thành tiền</th>
        </tr>
      </thead>
      <tbody>
        ${cartHTML}
      </tbody>
    </table>
    <p><b>Tổng giá trị:</b> ${formatCurrency(parseInt(totalPrice))}</p>
    </div>
  `

  const save = (e) => {
    e.preventDefault()
    const { name, address, phone, post, province, city, area } = state
    if (name && address && phone && post && province && city && area) {
      setRes(true)
    }
  }

  const place_orders = () => {

    // Dispatch action
    dispatch(
      place_order({
        rcv: email,
        subject: 'Đơn hàng mới từ website của bạn',
        body: emailContent,
      })
    )

  }

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
              <h2 className="text-3xl font-bold">Trang vận chuyển</h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Trang chủ</Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span>Vận chuyển </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
          <div className="w-full flex flex-wrap">
            <div className="w-[67%] md-lg:w-full">
              <div className="flex flex-col gap-3">
                <div className="bg-white p-6 shadow-sm rounded-md">
                  <h2 className="text-slate-600 font-bold pb-3">
                    Thông tin người nhận
                  </h2>

                  {!res && (
                    <>
                      <form onSubmit={save}>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="name"> Tên </label>
                            <input
                              onChange={inputHandle}
                              value={state.name}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="name"
                              id="name"
                              placeholder="Name"
                              required
                            />
                          </div>

                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="address"> Địa chỉ </label>
                            <input
                              onChange={inputHandle}
                              value={state.address}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="address"
                              id="address"
                              placeholder="Address"
                              required
                            />
                          </div>
                        </div>

                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="phone"> Số điện thoại </label>
                            <input
                              onChange={inputHandle}
                              value={state.phone}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="phone"
                              id="phone"
                              placeholder="Phone"
                              required
                            />
                          </div>

                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="post"> Mã bưu điện </label>
                            <input
                              onChange={inputHandle}
                              value={state.post}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="post"
                              id="post"
                              placeholder="Post"
                              required
                            />
                          </div>
                        </div>

                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="province"> Huyện </label>
                            <input
                              onChange={inputHandle}
                              value={state.province}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="province"
                              id="province"
                              placeholder="Province"
                              required
                            />
                          </div>

                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="city"> Thành phố/ Tỉnh </label>
                            <input
                              onChange={inputHandle}
                              value={state.city}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="city"
                              id="city"
                              placeholder="City"
                              required
                            />
                          </div>
                        </div>

                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="area"> Khu vực </label>
                            <input
                              onChange={inputHandle}
                              value={state.area}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="area"
                              id="area"
                              placeholder="Area"
                              required
                            />
                          </div>

                          <div className="flex flex-col gap-1 mt-7 mb-2 w-full">
                            <button className="px-3 py-[6px] rounded-sm hover:shadow-green-500/50 hover:shadow-lg bg-green-500 text-white">
                              Lưu thay đổi
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}

                  {res && (
                    <div className="flex flex-col gap-1">
                      <h2 className="text-slate-600 font-semibold pb-2">
                        Giao hàng tới {state.name}
                      </h2>
                      <p>
                        <span className="bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded">
                          Home
                        </span>
                        <span>
                          {state.phone} {state.address} {state.province}{' '}
                          {state.city} {state.area}{' '}
                        </span>

                        <span
                          onClick={() => setRes(false)}
                          className="text-indigo-500 cursor-pointer"
                        >
                          Thay đổi{' '}
                        </span>
                      </p>

                      <p className="text-slate-600 text-sm">
                        Email To: {email}
                      </p>
                    </div>
                  )}
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
                          <h2 className="text-md font-semibold">{pt.name}</h2>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center items-center w-5/12 sm:w-full sm:mt-3">
                      <h2 className="text-lg text-orange-500">
                        {formatCurrency(parseInt(pt.price))} x {pt.quantity}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-[33%] md-lg:w-full">
              <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                <div className="bg-white p-3 text-slate-600 flex flex-col gap-3">
                  <h2 className="text-xl font-bold">Tóm tắt đặt hàng</h2>
                  <div className="flex justify-between items-center">
                    <span>Tổng sản phẩm ({cart.length}) </span>
                    <span>{formatCurrency(parseInt(totalPrice))}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Phí vận chuyển </span>
                    <span>0</span>
                  </div>

                  {/* <div className="flex justify-between items-center">
                    <span>Tổng thanh toán </span>
                    <span>{formatCurrency(parseInt(totalPrice))}</span>
                  </div> */}

                  <div className="flex justify-between items-center">
                    <span>Tổng</span>
                    <span className="text-lg text-[#059473]">
                      {formatCurrency(parseInt(totalPrice))}
                    </span>
                  </div>
                  <button
                    onClick={place_orders}
                    disabled={res ? false : true}
                    className={`px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg ${
                      res ? 'bg-red-500' : 'bg-red-300'
                    }  text-sm text-white uppercase`}
                  >
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Shipping
