import React from 'react'
import AppNavbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Blog from './pages/Blog'
import Login from './pages/Login'
import TopBar from './components/Topbar/TopBar'
import Footer from './components/Footer/Footer'
import PlaceOrder from './components/PlaceOrder/PlaceOrder'
import Breadcrumb from './components/BreadCrumb/Breadcrumb'

const App = () => {
  return (
    <div>
      <TopBar/>
      <AppNavbar/>
      <Breadcrumb/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/features' element={<Collection/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/products/:productId' element={<Product/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/place-order' element={<PlaceOrder/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App