import React, {useEffect} from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import FeatureProducts from '../components/products/FeatureProducts'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from './../store/reducers/categoryReducer';

const Home = () => {

  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state.category)

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  return (
    <div className="w-full">
      <Header />
      <Banner />
      {categories.map((category, i) => (
        <div key={i} className='mb-10'>
          <FeatureProducts category={category.name} />
        </div>
      ))}
     
      <Footer />
    </div>
  )
}

export default Home
