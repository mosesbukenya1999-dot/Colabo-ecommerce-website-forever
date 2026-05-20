import React from 'react'
import Hero from '../components/Hero/Hero'
import QuikFilter from '../components/QuikFilter/QuikFilter'
import ProductSee from '../components/ProductSee/ProductSee'
import TextureClothSect from '../components/TextureClothSect/TextureClothSect'
import LatestProducts from '../components/LatestProducts/LatestProducts'


const Home = () => {
  return (
    <div className=''>
        <Hero/>
        <QuikFilter/>
       <ProductSee/>
       <TextureClothSect/>
       <LatestProducts/>
    </div>
  )
}

export default Home