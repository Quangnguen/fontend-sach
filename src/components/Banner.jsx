import React from 'react'
import Carousel from 'react-multi-carousel'
import { Link } from 'react-router-dom'
import 'react-multi-carousel/lib/styles.css'
import banner1 from '../assets/images/banner/1.jpg'
import banner2 from '../assets/images/banner/2.jpg'
import banner3 from '../assets/images/banner/3.jpg'
import banner4 from '../assets/images/banner/4.jpg'
import banner5 from '../assets/images/banner/5.jpg'
import banner6 from '../assets/images/banner/6.jpg'

const Banner = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  return (
    <div className="w-full md-lg:mt-6">
      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="w-full flex flex-wrap md-lg:gap-8">
          <div className="w-full">
            <div className="my-8">
              <Carousel
                autoPlay={true}
                infinite={true}
                arrows={true}
                showDots={true}
                responsive={responsive}
              >
                {[banner1, banner2, banner3, banner4, banner5, banner6].map(
                  (img, i) => (
                    <Link key={i} to="#">
                      <img src={img} alt="" />
                    </Link>
                  )
                )}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
