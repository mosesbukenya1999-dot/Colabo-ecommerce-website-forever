import React from 'react'
import { assets } from "../../assets/assets";

const Navbar = ({ setToken }) => {
    return (
        <nav className="navbar navbar-expand navbar-light bg-light shadow-sm">
            <div className="nav navbar-nav d-flex justify-content-between align-items-center vw-100">
                <div className=' mx-4'>

                    <a className="nav-item nav-link active" href="#">
                        <img style={{ width: "120px" }} src={assets.logo} alt="" />
                    </a>
                </div>
                <div className=' mx-5'>

                    <button onClick={() => setToken('')} className=' btn btn-dark px-2 py-1'>Logged</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar