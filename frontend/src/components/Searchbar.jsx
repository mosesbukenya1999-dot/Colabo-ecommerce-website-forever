import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom';

const Searchbar = () => {
    const { search, setShowSearch, showSearch, setSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false)
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("collection")) {
            setVisible(true)
        }

        else {
            setVisible(false)
        }

    }, [location])

    return showSearch && visible ? (
        <div className="border-top bg-light  text-center border-bottom">
            <div className=" d-inline-flex align-items-center gap-2 justify-content-center border px-5 py-2 my-5 mx-3 rounded-5 w-50">
                <input value={search} onChange={(e) => setSearch(e.target.value)} className=' flex-grow-1' type="text" placeholder='search' />
                <img src={assets.search_icon} alt="" className="" />
            </div>
            <img style={{ cursor: 'pointer' }} onClick={() => setShowSearch(false)} className=' d-inline cursor-pointer' src={assets.cross_icon} alt="" />
        </div>
    ) : null
}

export default Searchbar