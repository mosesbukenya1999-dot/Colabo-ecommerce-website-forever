import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className=' container-fluid'>
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr' }} className="flex-column gap-2 my-5 ">
                <div>
                    <img src={assets.logo} className=' mb-5 w-25' alt="" />
                    <p className=' w-50'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, consequuntur deleniti modi quae id voluptatem vel expedita eveniet dolorem adipisci rerum labore veniam, reiciendis sunt cum maxime corporis cumque ullam.</p>
                </div>
                <div>
                    <p className=' fw-medium mb-5'>COMPANY</p>
                    <ul className=' d-flex flex-column gap-1 text-secondary'>
                        <li className=' list-unstyled'>Home</li>
                        <li className=' list-unstyled'>About us</li>
                        <li className=' list-unstyled'>Delivery</li>
                        <li className=' list-unstyled'>Privacy policy</li>
                    </ul>
                </div>

                <div>
                    <p className=' fw-medium mb-5'>GET IN TOUCH</p>
                    <ul className=" d-flex flex-column gap-1 text-secondary">
                        <li className=' list-unstyled'>+2567435768</li>
                        <li className=' list-unstyled'>contact@email.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className=' py-2 text-center'>Copyright 2025@ forver.com - All Rights Reserved.</p>
        </div>
    )
}

export default Footer