import React, { useEffect } from 'react'
import Carousel from 'react-multi-carousel'
import { Link } from 'react-router-dom'
import 'react-multi-carousel/lib/styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { get_products_by_category } from '../../store/reducers/homeReducer'
import apii from '../../api/apii'
import { formatCurrency, truncateText } from '../../utils/format'

const FeatureProducts = ({ category }) => {
  console.log(category)
  const { productByCat } = useSelector((state) => state.home)
  console.log(productByCat)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      get_products_by_category({
        category: category,
      })
    )
  }, [category, dispatch])

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  }

  return (
    <div className="w-[87%] mx-auto relative">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
          <h2>{category}</h2>
          <div className=" w-[100px] h-[2px] bg-[#059473] mt-4"></div>
        </div>
      </div>
      <Carousel
        autoPlay={true}
        infinite={true}
        arrows={true}
        responsive={responsive}
        transitionDuration={500}
      >
        {productByCat.map((c, i) => (
          <Link to={`/product/detail/${c.id}`} className="block px-1">
            <div className="relative h-[270px]">
              <div className="w-full h-full">
                <img
                  className="w-full h-full"
                  src={`http://ahoang.runasp.net/api/ImageUpload/get/${c.imageFileName}`}
                  alt=""
                />
                <div className="absolute h-full w-full top-0 left-0 opacity-25 hover:bg-slate-400 transition-all duration-500"></div>
              </div>
            </div>

            <div className="p-4 flex flex-col gap-1">
              <h2 className="text-slate-600 text-lg font-bold">
                {truncateText(c.name, 20)}
              </h2>
              <div className="flex justify-start items-center gap-3">
                <h2 className="text-lg font-bold text-slate-600">
                  {formatCurrency(parseInt(c.price))}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  )
}

export default FeatureProducts
