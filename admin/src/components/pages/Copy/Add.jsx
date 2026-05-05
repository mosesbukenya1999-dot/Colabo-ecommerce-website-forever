import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios';
import { backendUrl } from '../../App';

const Add = ({ token }) => {


    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [sizes, setSizes] = useState([])
    const [bestseller, setBestseller] = useState(false);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('Men')
    const [subCategory, setSubCategory] = useState('Topwear')
    const [price, setPrice] = useState('');


    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append('name', name)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('sizes', JSON.stringify(sizes))
            formData.append('bestseller', bestseller)
            formData.append('category', category)
            formData.append('subCategory', subCategory);

            formData.append('image1', image1)
            formData.append('image2', image2)
            formData.append('image3', image3)
            formData.append('image4', image4);

            const response = await axios.post(backendUrl + '/api/products/add', formData, { headers: { token } });

            if (response.data.success) {
                alert(response.data.message);

                setName('');
                setPrice('');
                setDescription('');
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false)
            } else {
                alert(response.data.message)
            }


        } catch (error) {
            console.log(error);
            alert(error.message)
        }

    }

    return (
        <form onSubmit={onSubmitHandler} className=' container m-3 rounded-2 shadow-sm px-3 py-3 bg-light'>
            <p>Add Product</p>

            <div className="mt-4">
                <p>Upload Images</p>

                <div className="d-flex gap-4">
                    <div>
                        <label htmlFor="image1">
                            <img style={{ width: '120px', cursor: 'pointer' }} src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                        </label>
                        <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
                    </div>

                    <div>
                        <label htmlFor="image2">
                            <img style={{ width: '120px', cursor: 'pointer' }} src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                        </label>
                        <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
                    </div>

                    <div>
                        <label htmlFor="image3">
                            <img style={{ width: '120px', cursor: 'pointer' }} src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                        </label>
                        <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
                    </div>

                    <div>
                        <label htmlFor="image4">
                            <img style={{ width: '120px', cursor: 'pointer' }} src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                        </label>
                        <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
                    </div>

                </div>

            </div>

            <div className="mt-3">
                <p>Product Name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='enter name' className=' px-2 py-1 text-dark rounded-2 w-100 border-secondary' required />
            </div>

            <div className="mt-3">
                <p>Product Description</p>
                <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder='enter description' className=' px-2 py-1 text-dark rounded-2 w-100 border-secondary' required />
            </div>

            <div className=" d-flex gap-4 mt-4">
                <div>
                    <p>Product Category</p>
                    <select onChange={(e) => setCategory(e.target.value)} value={category} className=' rounded-2 px-2 py-1 border-secondary text-dark' >
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>

                <div>
                    <p>Sub Category</p>
                    <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className=' rounded-2 px-2 py-1 border-secondary text-dark' >
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>

                <div>
                    <p>Product Price</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" className=' px-2 py-1 rounded-2 w-25' placeholder='25' />
                </div>
            </div>

            <div className=' mt-4'>
                <p>Product Sizes</p>

                <div className="d-flex gap-3">
                    <div style={{ cursor: 'pointer' }} onClick={() => setSizes(prev => prev.includes('S') ? prev.filter(item => item !== 'S') : [...prev, 'S'])} className=''>
                        <p className={` bg-white px-2 py-1 border-2 rounded-3 shadow-sm ${sizes.includes('S') ? 'text-danger' : 'text-dark'} `}>S</p>
                    </div>

                    <div style={{ cursor: 'pointer' }} onClick={() => setSizes(prev => prev.includes('M') ? prev.filter(item => item !== 'M') : [...prev, 'M'])} className=''>
                        <p className={` bg-white px-2 py-1 border-2 rounded-3 shadow-sm ${sizes.includes('M') ? 'text-danger' : 'text-dark'} `}>M</p>
                    </div>

                    <div style={{ cursor: 'pointer' }} onClick={() => setSizes(prev => prev.includes('L') ? prev.filter(item => item !== 'L') : [...prev, 'L'])} className=''>
                        <p className={` bg-white px-2 py-1 border-2 rounded-3 shadow-sm ${sizes.includes('L') ? 'text-danger' : 'text-dark'} `}>L</p>
                    </div>

                    <div style={{ cursor: 'pointer' }} onClick={() => setSizes(prev => prev.includes('XL') ? prev.filter(item => item !== 'XL') : [...prev, 'XL'])} className=''>
                        <p className={` bg-white px-2 py-1 border-2 rounded-3 shadow-sm ${sizes.includes('XL') ? 'text-danger' : 'text-dark'} `}>XL</p>
                    </div>

                    <div style={{ cursor: 'pointer' }} onClick={() => setSizes(prev => prev.includes('XXL') ? prev.filter(item => item !== 'XXL') : [...prev, 'XXL'])} className=''>
                        <p className={` bg-white px-2 py-1 border-2 rounded-3 shadow-sm ${sizes.includes('XXL') ? 'text-danger' : 'text-dark'} `}>XXL</p>
                    </div>
                </div>
            </div>

            <div className="mt-3 d-flex align-items-center gap-2">
                <input onChange={() => setBestseller(prev => !prev)} value={bestseller} type="checkbox" id='bestseller' />

                <label htmlFor="bestseller">
                    Add to bestseller
                </label>
            </div>

            <button type='submit' className="btn btn-dark px-5 py-2 mt-3">ADD</button>

        </form>
    )
}

export default Add