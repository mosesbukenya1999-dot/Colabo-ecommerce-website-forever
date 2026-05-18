import React, { useContext, useEffect, useState } from "react";
import "./CSS/login.css";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");

  const { backendUrl, navigate, token, setToken } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (currentState === "Sign Up") {
        // Prepare FormData for file upload
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);

        if (profileImage) {
          formData.append("profileImage", profileImage);
        }

        const res = await axios.post(
          backendUrl + "/api/users/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
        } else {
          alert(res.data.message);
        }
      } else {
        // Login
        const res = await axios.post(backendUrl + "/api/users/login", {
          email,
          password,
        });

        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
        } else {
          alert(res.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="real-form flex-column">
      <div className="form-container">
        <h2>{currentState}</h2>

        {currentState === "Sign Up" && (
          <>
            {/* Name */}
            <div className="input-container">
              <p>Enter Name</p>
              <input
                type="text"
                placeholder="username"
                autoComplete="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Profile Image */}
            <div className="input-container">
              <p>Upload Profile Image</p>
              <input
                type="file"
                accept="image/*"
                capture="user"
                onChange={(e) => setProfileImage(e.target.files[0])}
              />
            </div>
          </>
        )}

        {/* Email */}
        <div className="input-container">
          <p>Enter Email</p>
          <input
            type="email"
            placeholder="enter email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="input-container">
          <p>Enter Password</p>
          <input
            type="password"
            placeholder="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-danger login-btn"
          disabled={loading}
        >
          {loading ? <div className="spinner"></div> : currentState}
        </button>

        {/* Toggle Sign Up / Login */}
        {currentState === "Sign Up" ? (
          <p className="other-text">
            Already have an account?{" "}
            <span
              className="inner-other-text"
              onClick={() => setCurrentState("Login")}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="other-text">
            Don't have an account?{" "}
            <span
              className="inner-other-text"
              onClick={() => setCurrentState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;