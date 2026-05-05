import React from 'react'
import Hero from '../components/Hero/Hero'
import QuikFilter from '../components/QuikFilter/QuikFilter'
import ProductOverView from '../components/productOverView/productOverView'

const Home = () => {
  return (
    <div className=''>
        <Hero/>
        <QuikFilter/>
        <ProductOverView/>
    </div>
  )
}

export default Home