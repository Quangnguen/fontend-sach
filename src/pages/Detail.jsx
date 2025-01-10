import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
// import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useDispatch, useSelector } from 'react-redux'
import {
  product_details,
  product_relations,
} from '../store/reducers/shopReducer'
import toast from 'react-hot-toast'
import { formatCurrency, truncateText } from '../utils/format'
import { addProduct } from '../store/reducers/cartReducer'
import bannerImage from '../assets/images/banner/shop.png'

const Details = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(product_details(slug))
  }, [slug, dispatch])

  const { product, relatedProducts } = useSelector((state) => state.shop)

  // const [image, setImage] = useState('')

  const [quantity, setQuantity] = useState(1)
  const inc = () => {
    if (quantity >= product.stock) {
      toast.error('Out of Stock')
    } else {
      setQuantity(quantity + 1)
    }
  }
  const dec = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(product_relations({ category: product.category }))
  }, [product, dispatch])

  const buynow = () => {
    const productObj = {
      id: product.id,
      image: product.imageFileName,
      name: product.name,
      price: product.price,
      quantity,
    }
    dispatch(addProduct(productObj))
    navigate('/shipping')
  }

  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart)) // Lưu giỏ hàng vào localStorage
  }, [cart])

  const handleAddProduct = (id, image, name, price) => {
    const product = {
      id,
      image,
      name,
      price,
      quantity,
    }
    dispatch(addProduct(product))
  }

  // const responsive = {
  //   superLargeDesktop: {
  //     breakpoint: { max: 4000, min: 3000 },
  //     items: 5,
  //   },
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 5,
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 4,
  //   },
  //   mdtablet: {
  //     breakpoint: { max: 991, min: 464 },
  //     items: 4,
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 3,
  //   },
  //   smmobile: {
  //     breakpoint: { max: 640, min: 0 },
  //     items: 2,
  //   },
  //   xsmobile: {
  //     breakpoint: { max: 440, min: 0 },
  //     items: 1,
  //   },
  // }

  return (
    <div>
      <Header />
      <section
        className="h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left"
        style={{ backgroundImage: `url(${bannerImage})` }} // Use the imported image
      >
        import {(truncateText, formatCurrency)} from './../utils/format';
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">Chi tiết sản phẩm</h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Trang chủ</Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span>Chi tiết dự án</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-slate-100 py-5 mb-5">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex justify-start items-center text-md text-slate-600 w-full">
              <Link to="/">Trang chủ</Link>
              <span className="pt-1">
                <IoIosArrowForward />
              </span>
              <Link to="/">{product.category}</Link>
              <span className="pt-1">
                <IoIosArrowForward />
              </span>
              <span>{product.name}</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] pb-16 h-full mx-auto">
          <div className="grid grid-cols-2 md-lg:grid-cols-1 gap-8">
            <div>
              <div className="p-5 border">
                <img
                  className="h-[600px] lg:w-[80%] flex justify-center items-center mx-auto"
                  src={`https://ahoang.onrender.com/api/ImageUpload/get/${product.imageFileName}`}
                  alt=""
                />
              </div>
              {/* <div className="py-3">
                {product.images && (
                  <Carousel
                    autoPlay={true}
                    infinite={true}
                    responsive={responsive}
                    transitionDuration={500}
                  >
                    {images.map((img, i) => {
                      return (
                        <div key={i} onClick={() => setImage(img)}>
                          <img
                            className="h-[120px] cursor-pointer"
                            src={img}
                            alt=""
                          />
                        </div>
                      )
                    })}
                  </Carousel>
                )}
              </div> */}
            </div>

            <div className="flex flex-col gap-5">
              <div className="text-3xl text-slate-600 font-bold">
                <h3>{product.name} </h3>
              </div>
              <div className="flex justify-start items-center gap-4">
                <div className="flex text-xl">
                  {/* <Rating ratings={4.5} /> */}
                </div>
                {/* <span className="text-green-500">(24 reviews)</span> */}
              </div>

              <div className="text-2xl text-red-500 font-bold flex gap-3">
                {/* {product.discount !== 0 ? (
                  <>
                    Price : <h2 className="line-through">{product.price}</h2>
                    <h2>
                      $
                      {product.price -
                        Math.floor(
                          (product.price * product.discount) / 100
                        )}{' '}
                      (-{product.discount}%){' '}
                    </h2>
                  </>
                ) : ( */}
                <h2> Price : {formatCurrency(parseInt(product.price))} </h2>
                {/* )} */}
              </div>

              <div className="text-slate-600">
                <p>{product.description}</p>
                {/* <p className="text-slate-600 py-1 font-bold">
                  Shop Name : {product.shopName}
                </p> */}
              </div>

              <div className="flex gap-3 pb-10 border-b">
                {/* {product.stock ? (
                  <> */}
                <div className="flex bg-slate-200 h-[50px] justify-center items-center text-xl">
                  <div onClick={dec} className="px-6 cursor-pointer">
                    -
                  </div>
                  <div className="px-6">{quantity}</div>
                  <div onClick={inc} className="px-6 cursor-pointer">
                    +
                  </div>
                </div>
                <div>
                  <button
                    onClick={() =>
                      handleAddProduct(
                        product.id,
                        product.imageFileName,
                        product.name,
                        product.price
                      )
                    }
                    className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#059473] text-white"
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
                {/* </> */}
                {/* // ) : (
                //   ''
                // )} */}

                {/* <div>
                  <div
                    onClick={add_wishlist}
                    className="h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 bg-cyan-500 text-white"
                  >
                    <FaHeart />
                  </div>
                </div> */}
              </div>

              <div className="flex gap-3">
                {/* {product.stock ? ( */}
                <button
                  onClick={buynow}
                  className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#247462] text-white"
                >
                  Mua ngay
                </button>
                {/* ) : (
                  ''
                )}
                <Link
                  to={`/dashboard/chat/${product.sellerId}`}
                  className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-red-500/40 bg-red-500 text-white"
                >
                  Chat Seller
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <h2 className="text-2xl py-8 text-slate-600">Sản phẩm liên quan</h2>
          <div>
            <Swiper
              slidesPerView="auto"
              breakpoints={{
                1280: {
                  slidesPerView: 4,
                },
                991: {
                  slidesPerView: 3,
                },
                565: {
                  slidesPerView: 2,
                },
              }}
              spaceBetween={25}
              loop={true}
              pagination={{
                clickable: true,
                el: '.custom_bullet',
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {relatedProducts.map((p, i) => {
                return (
                  <SwiperSlide key={i}>
                    <Link className="block">
                      <div className="relative h-[270px]">
                        <div className="w-full h-full">
                          <img
                            className="w-full h-full"
                            src={`https://ahoang.onrender.com/api/ImageUpload/get/${p.imageFileName}`}
                            alt=""
                          />
                          <div className="absolute h-full w-full top-0 left-0 opacity-25 hover:bg-slate-500 transition-all duration-500"></div>
                        </div>
                      </div>

                      <div className="p-4 flex flex-col gap-1">
                        <h2 className="text-slate-600 text-lg font-bold">
                          {truncateText(p.name, 20)}
                        </h2>
                        <div className="flex justify-start items-center gap-3">
                          <h2 className="text-lg font-bold text-slate-600">
                            {formatCurrency(parseInt(p.price))}
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>

          <div className="w-full flex justify-center items-center py-8">
            <div className="custom_bullet justify-center gap-3 !w-auto"></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Details
