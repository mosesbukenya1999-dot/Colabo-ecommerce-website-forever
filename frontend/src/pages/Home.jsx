import React from 'react'
import Hero from '../components/Hero/Hero'
import QuikFilter from '../components/QuikFilter/QuikFilter'
import ProductSee from '../components/ProductSee/ProductSee'


const Home = () => {
  return (
    <div className=''>
        <Hero/>
        <QuikFilter/>
       <ProductSee/>
    </div>
  )
}

export default Home