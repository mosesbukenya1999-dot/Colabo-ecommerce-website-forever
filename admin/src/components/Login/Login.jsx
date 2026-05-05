import React, { useState } from 'react'
import axios from "axios";
import { backendUrl } from '../../App';

const Login = ({ setToken }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(backendUrl + '/api/user/admin', { email, password });

            if (response.data.success) {
                setToken(response.data.token);
            } else {
                alert(response.data.message)
            }


        } catch (error) {
            console.log(error);
            alert(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='container vw-100 vh-100 d-flex flex-column align-items-center justify-content-center'>
            <div className=' bg-light w-50 px-2 py-4 rounded-3 shadow-sm'>
                <h3>Login Here</h3>

                <div className="mt-3">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className=' w-100 px-2 py-1 text-secondary border-secondary rounded-2' type="email" placeholder='enter email' required />
                </div>

                <div className="mt-3 mb-5">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className=' w-100 px-2 py-1 text-secondary border-secondary rounded-2' type="password" placeholder='enter Password' required />
                </div>

                <button type='submit' className="btn btn-dark w-100">Login</button>
            </div>
        </form>
    )
}

export default Login