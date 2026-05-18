import React, {useState } from 'react'
import "./CSS/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    
  }

  return (
    <form onSubmit={onSubmitHandler}  className='real-form flex-column'>

      <div className="form-container">

        <h2>Login</h2>

        <div className="input-container">
          <p>Enter Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder='enter email'
            autoComplete='email'
          />
        </div>

        <div className="input-container">
          <p>Enter Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder='password'
            autoComplete='current-password'
          />
        </div>

        <button
          type='submit'
          className="btn btn-danger login-btn"
         
        >
          Login
        </button>

      </div>
    </form>
  )
}

export default Login