import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './components/pages/Add'
import List from './components/pages/List'
import Order from './components/pages/Order'
import Login from './components/Login/Login'



// eslint-disable-next-line react-refresh/only-export-components
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '$'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.getItem('token')
  }, [token])

  return (
    <div>

      {
        token === '' ?
          <Login setToken={setToken} />
          :
          <>
            <Navbar setToken={setToken} />

            <div className="d-flex gap-3">
              <Sidebar />

              <Routes>
                <Route path='/' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Order token={token} />} />
              </Routes>

            </div>
          </>
      }


    </div>
  )
}

export default App