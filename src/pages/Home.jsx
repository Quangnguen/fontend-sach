import React, { useEffect } from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import FeatureProducts from '../components/products/FeatureProducts'
import Products from '../components/products/Products'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { get_products } from '../store/reducers/homeReducer'
import categories from './../utils/categories';

const Home = () => {



  return (
    <div className="w-full">
      <Header />
      <Banner />
      {categories.map((category) => (
        <div key={category.id} className='mb-10'>
          <FeatureProducts category={category.name} />
        </div>
      ))}
     
      <Footer />
    </div>
  )
}

export default Home
