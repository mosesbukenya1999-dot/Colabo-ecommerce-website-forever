import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import axios from "axios";
import { backendUrl } from '../../App';

const Add = ({ token }) => {

    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Men');
    const [subCategory, setSubCategory] = useState('Topwear');
    const [sizes, setSizes] = useState([]);
    const [bestseller, setBestseller] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData();

            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('sizes', JSON.stringify(sizes));
            formData.append('bestseller', bestseller);
            formData.append('category', category);
            formData.append('subCategory', subCategory);


            formData.append('image1', image1);
            formData.append('image2', image2);
            formData.append('image3', image3);
            formData.append('image4', image4);

            const response = await axios.post(backendUrl + '/api/products/add', formData, { headers: { token } });

            if (response.data.success) {
                alert(response.data.message)

                setName('');
                setDescription('');
                setPrice('');

                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);

            } else {
                alert(response.data.message)
            }


        } catch (error) {
            console.log(error);
            alert(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className=' container px-3'>
            <div className="d-flex flex-column gap-4">
                <div>
                    <p>Upload Images</p>
                    <div className="d-flex gap-3">
                        <div>
                            <label htmlFor="image1">
                                <img style={{ cursor: 'pointer', width: "120px" }} src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                            </label>
                            <input onChange={(e) => setImage1(e.target.files[0])} type="file" hidden id='image1' />

                        </div>

                        <div>
                            <label htmlFor="image2">
                                <img style={{ cursor: 'pointer', width: "120px" }} src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                            </label>
                            <input onChange={(e) => setImage2(e.target.files[0])} type="file" hidden id='image2' />

                        </div>

                        <div>
                            <label htmlFor="image3">
                                <img style={{ cursor: 'pointer', width: "120px" }} src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                            </label>
                            <input onChange={(e) => setImage3(e.target.files[0])} type="file" hidden id='image3' />

                        </div>

                        <div>
                            <label htmlFor="image4">
                                <img style={{ cursor: 'pointer', width: "120px" }} src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                            </label>
                            <input onChange={(e) => setImage4(e.target.files[0])} type="file" hidden id='image4' />

                        </div>
                    </div>

                </div>

                <div>
                    <p>Product Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} className=' w-50 rounded-2 border-secondary px-2' type="text" placeholder='enter name' required />
                </div>

                <div>
                    <p>Product Description</p>
                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} className=' w-50 rounded-2 border-secondary px-2' type="text" placeholder='enter description' required />
                </div>

                <div className="d-flex gap-4 align-items-center">
                    <div>
                        <p>Product Category</p>
                        <select onChange={(e) => setCategory(e.target.value)} >
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Kids">Kids</option>
                        </select>
                    </div>
                    <div>
                        <p>Sub Category</p>
                        <select onChange={(e) => setSubCategory(e.target.value)} >
                            <option value="Topwear">Topwear</option>
                            <option value="Winterwear">Winterwear</option>
                            <option value="Bottomwear">Bottomwear</option>
                        </select>
                    </div>

                    <div>
                        <p>Product Price</p>
                        <input onChange={(e) => setPrice(e.target.value)} value={price} className=' w-50 rounded-2 border-secondary px-2' type="number" placeholder='25' required />
                    </div>
                </div>

                <div className="mt-3">
                    <p>Products Size</p>
                    <div className="d-flex gap-3">
                        <div onClick={() => setSizes(prev => prev.includes('S') ? prev.filter(item => item !== 'S') : [...prev, 'S'])} className=' px-2 bg-light py-0 shadow-sm rounded-3'>
                            <p className={`${sizes.includes('S') ? 'text-danger' : 'text-dark'}`} style={{ cursor: 'pointer' }} >S</p>
                        </div>
                        <div onClick={() => setSizes(prev => prev.includes('M') ? prev.filter(item => item !== 'M') : [...prev, 'M'])} className=' px-2 bg-light py-0 shadow-sm rounded-3'>
                            <p className={`${sizes.includes('M') ? 'text-danger' : 'text-dark'}`} style={{ cursor: 'pointer' }}>M</p>
                        </div>
                        <div onClick={() => setSizes(prev => prev.includes('L') ? prev.filter(item => item !== 'L') : [...prev, 'L'])} className=' px-2 bg-light py-0 shadow-sm rounded-3'>
                            <p className={`${sizes.includes('L') ? 'text-danger' : 'text-dark'}`} style={{ cursor: 'pointer' }} >L</p>
                        </div>
                        <div onClick={() => setSizes(prev => prev.includes('XL') ? prev.filter(item => item !== 'XL') : [...prev, 'XL'])} className=' px-2 bg-light py-0 shadow-sm rounded-3'>
                            <p className={`${sizes.includes('XL') ? 'text-danger' : 'text-dark'}`} style={{ cursor: 'pointer' }} >XL</p>
                        </div>
                        <div onClick={() => setSizes(prev => prev.includes('XXL') ? prev.filter(item => item !== 'XXL') : [...prev, 'XXL'])} className=' px-2 bg-light py-0 shadow-sm rounded-3'>
                            <p className={`${sizes.includes('XXL') ? 'text-danger' : 'text-dark'}`} style={{ cursor: 'pointer' }} >XXL</p>
                        </div>
                    </div>

                    <div className="mt-3">
                        <input onChange={() => setBestseller(prev => !prev)} type="checkbox" id='bestseller' />
                        <label htmlFor="bestseller">Add to bestseller</label>
                    </div>

                    <button type="submit" className="btn btn-dark mt-3 w-25 mb-4">ADD</button>
                </div>

            </div>
        </form>
    )
}

export default Add