import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../../App';

const List = ({ token }) => {

    const [listProduct, setListProduct] = useState([]);

    const fetchProducts = async () => {
        try {

            const response = await axios.get(backendUrl + '/api/products/list', { headers: { token } });

            if (response.data.success) {
                setListProduct(response.data.products)
            }


        } catch (error) {
            console.log(error);
            alert(error.message)
        }
    }

    const removeProduct = async (id) => {
        try {

            const response = await axios.post(backendUrl + "/api/products/remove", { id }, { headers: { token } });

            if (response.data.success) {
                alert(response.data.message)
                fetchProducts()
            }

        } catch (error) {
            console.log(error);
            alert(error.message)
        }
    }

    useEffect(() => {
        fetchProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className=''>
            <div style={{ gridTemplateColumns: '1fr 3fr 1fr 1fr 1fr' }} className=" d-grid bg-light px-2 py-1">
                <b>Image</b>
                <b>Name</b>
                <b>Price</b>
                <b>Category</b>
                <b>Action</b>
            </div>

            {
                listProduct.map((item, index) => (
                    <div key={index} style={{ gridTemplateColumns: '1fr 3fr 1fr 1fr 1fr' }} className=' d-grid py-3 px-2'>
                        <img style={{ width: "80px" }} src={item.image[0]} alt="" />
                        <p>{item.name}</p>
                        <p>{currency}{item.price}</p>
                        <p>{item.category}</p>
                        <p style={{ cursor: 'pointer' }} onClick={() => removeProduct(item._id)}>x</p>
                    </div>
                ))
            }

        </div>
    )
}

export default List