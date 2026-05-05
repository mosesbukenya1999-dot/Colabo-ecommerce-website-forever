import React from 'react'
import "./Topwear.css";
import { NavLink } from 'react-router-dom';

const TopBar = () => {
  return (
    <div className=' container-fluid bg-dark d-none d-md-flex text-light justify-content-around py-1'>
        <div className="left-col mt-3">
        Free shipping for standard order over $100
        </div>
        <div className="right-col d-flex gap-4 mt-3">
            <NavLink className="text text-white text-decoration-none">Help & FAQs</NavLink>
            <NavLink to className="text text-white text-decoration-none">My Account</NavLink>
            <NavLink className="text text-white text-decoration-none">En</NavLink>
            <NavLink className="text text-white text-decoration-none">USD</NavLink>
        </div>
    </div>
  )
}

export default TopBar