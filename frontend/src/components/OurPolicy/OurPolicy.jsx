import React from 'react'
import { assets } from '../../assets/assets'

const OurPolicy = () => {
    return (
        <div className=' text-center py-3 gap-5 text-secondary d-flex align-items-center justify-content-center'>
            <div className="">
                <img className=' w-25' src={assets.exchange_icon} alt="" />
                <p className=' fw-semibold'>Easy Exchange Policy</p>
                <p className=' text-secondary-emphasis'>We offer hassle free exchange policy</p>
            </div>
            <div className="">
                <img className=' w-25' src={assets.quality_icon} alt="" />
                <p className=' fw-semibold'>7 Days return policy</p>
                <p className=' text-secondary-emphasis'>We provide 7 Days return policy</p>
            </div>
            <div className="">
                <img className=' w-25' src={assets.support_img} alt="" />
                <p className=' fw-semibold'>Best customer support</p>
                <p className=' text-secondary-emphasis'>we provide 24/7 customer support</p>
            </div>
        </div>
    )
}

export default OurPolicy