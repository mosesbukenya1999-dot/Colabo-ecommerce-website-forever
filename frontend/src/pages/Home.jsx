import React from 'react'
import Hero from '../components/Hero/Hero'
import QuikFilter from '../components/QuikFilter/QuikFilter'
import ProductSee from '../components/ProductSee/ProductSee'
import TextureClothSect from '../components/TextureClothSect/TextureClothSect'


const Home = () => {
  return (
    <div className=''>
        <Hero/>
        <QuikFilter/>
       <ProductSee/>
       <TextureClothSect/>
    </div>
  )
}

export default Home