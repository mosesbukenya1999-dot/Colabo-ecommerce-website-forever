import React, { useState } from 'react'
import { NavLink } from "react-router-dom";
import { assets } from '../../assets/assets';

const Sidebar = () => {

    const [menu, setMenu] = useState('add');

    return (
        <div className=' bg-light px-2 py-3 w-25 shadow-sm rounded-2'>
            <div className="d-flex flex-column gap-4">
                <NavLink className={' text-decoration-none text-dark'} to={'/'}>
                    <div onClick={() => setMenu('add')} className={` d-flex gap-2 align-items-center bg-white px-2 py-1 rounded-1 border ${menu === 'add' ? 'border-danger' : ''} `}>
                        <img style={{ width: '19px' }} src={assets.add_icon} alt="" />
                        <p>Add Product</p>
                    </div>
                </NavLink>

                <NavLink className={' text-decoration-none text-dark'} to={'/list'}>
                    <div onClick={() => setMenu('list')} className={` d-flex gap-2 align-items-center bg-white px-2 py-1 rounded-1 border ${menu === 'list' ? 'border-danger' : ''} `}>
                        <img style={{ width: '19px' }} src={assets.order_icon} alt="" />
                        <p>List Product</p>
                    </div>
                </NavLink>

                <NavLink className={' text-decoration-none text-dark'} to={'/orders'}>
                    <div onClick={() => setMenu('orders')} className={` d-flex gap-2 align-items-center bg-white px-2 py-1 rounded-1 border ${menu === 'orders' ? 'border-danger' : ''} `}>
                        <img style={{ width: '19px' }} src={assets.order_icon} alt="" />
                        <p>Orders</p>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar