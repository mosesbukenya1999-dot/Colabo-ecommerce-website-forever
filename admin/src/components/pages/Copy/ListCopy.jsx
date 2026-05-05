import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../../App';

const List = ({ token }) => {

    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {

            const response = await axios.get(backendUrl + '/api/products/list', { headers: { token } });

            if (response.data.success) {
                setList(response.data.products);
            } else {
                alert(response.data.message)
            }


        } catch (error) {
            console.log(error);
            alert(error.message)
        }
    };

    const removeProduct = async (id) => {
        try {

            const response = await axios.post(backendUrl + '/api/products/remove', { id }, { headers: { token } });

            if (response.data.success) {
                alert(response.data.message)
                fetchList()
            } else {
                alert(response.data.message)
            }

        } catch (error) {
            console.log(error);
            alert(error.message)
        }
    }

    useEffect(() => {
        fetchList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className=' bg-light-subtle mx-3 px-3 py-4 vw-100 rounded-3 shadow-sm'>
            <p>List Products</p>

            <div style={{ gridTemplateColumns: '1fr 3fr 1fr 1fr 1fr' }} className=" d-grid text-dark bg-light px-2 py-2 rounded-3 shadow-sm">
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>
            </div>

            <div>
                {
                    list.map((item, index) => (
                        <div style={{ gridTemplateColumns: '1fr 3fr 1fr 1fr 1fr' }} key={index} className=' d-grid gap-2 px-1 py-2 border'>
                            <img style={{ width: '48px' }} src={item.image[0]} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{item.price}</p>
                            <p onClick={() => removeProduct(item._id)} style={{ cursor: 'pointer' }}>x</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default List