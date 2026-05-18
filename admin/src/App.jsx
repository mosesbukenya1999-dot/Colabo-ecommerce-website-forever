import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import ListProducts from "./pages/ListProducts";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Login from "./pages/Login";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState("");

  return (
    <div>
      {token === "" ? (
        <Login />
      ) : (
        <>
          <div className="d-flex gap-4">
            <Navbar />
            <Routes>
              <Route path="/" element={<AddProduct />} />
              <Route path="/list" element={<ListProducts />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
