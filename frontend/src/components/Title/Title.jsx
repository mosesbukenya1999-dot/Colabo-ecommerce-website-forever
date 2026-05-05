import React from 'react'
import "./Title.css";

const Title = ({ text1, text2 }) => {
    return (
        <div className=' d-inline-flex gap-2 align-items-center mb-3'>
            <p>{text1} <span>{text2}</span></p>
            <p className='under-line'></p>
        </div>
    )
}

export default Title