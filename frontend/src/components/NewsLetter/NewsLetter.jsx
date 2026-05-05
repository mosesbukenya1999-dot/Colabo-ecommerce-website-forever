import React from 'react'

const NewsLetter = () => {
    const onSubmithandler = (event) => {
        event.preventDefault()
    }

    return (
        <div className=' text-center my-5'>
            <p className=" fw-medium text-secondary-emphasis">Subscribe now & get 20% off</p>
            <p className=' text-secondary'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit iste atque mollitia consequatur alias provident qui.
            </p>

            <form onSubmit={onSubmithandler} className='rounded-2  w-50 d-flex align-items-center justify-content-center gap-2 mx-auto border' >
                <input style={{ outline: 'none' }} className=' w-75 border-0' type="email" placeholder='Enter your email' required />
                <button type='submit' className='btn btn-dark rounded-1 w-25'>SUBSCRIBE</button>
            </form>
        </div>
    )
}

export default NewsLetter