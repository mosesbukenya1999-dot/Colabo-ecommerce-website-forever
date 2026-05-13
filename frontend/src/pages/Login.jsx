import React, { useContext, useEffect, useState } from 'react'
import "./CSS/login.css";
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const Login = () => {

  const [currentState, setCurrentState] = useState("Login");

  const { backendUrl, navigate, token, setToken } = useContext(ShopContext)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      if (currentState === "Login") {

        const res = await axios.post(
          backendUrl + "/api/users/login",
          { email, password }
        );

        if (res.data.success) {
          localStorage.setItem("token", res.data.token)
          setToken(res.data.token);
        } else {
          alert(res.data.message)
        }

      } else {

        const res = await axios.post(
          backendUrl + "/api/users/register",
          { name, email, password }
        );

        if (res.data.success) {
          localStorage.setItem("token", res.data.token)
          setToken(res.data.token);
        } else {
          alert(res.data.message)
        }
      }

    } catch (error) {
      console.log(error);
      alert(error.message)

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='real-form flex-column'>

      <div className="form-container">

        <h2>{currentState}</h2>

        {
          currentState === "Sign Up" &&
          <div className="input-container">
            <p>Enter Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder='username'
              autoComplete='username'
            />
          </div>
        }

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
          disabled={loading}
        >
          {
            loading
              ? <div className="spinner"></div>
              : currentState
          }
        </button>

        {
          currentState === "Sign Up"
            ?
            <p className='other-text'>
              Already have an account?
              <span
                onClick={() => setCurrentState("Login")}
                className='inner-other-text'
              >
                Login here
              </span>
            </p>
            :
            <p className='other-text'>
              Don't have an account?
              <span
                onClick={() => setCurrentState("Sign Up")}
                className='inner-other-text'
              >
                Sign Up
              </span>
            </p>
        }

      </div>
    </form>
  )
}

export default Login