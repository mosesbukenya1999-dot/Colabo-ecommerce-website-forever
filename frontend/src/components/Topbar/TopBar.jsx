import React, { useContext} from 'react'
import "./Topwear.css";
import { NavLink } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';

const TopBar = () => {

  const {token,setToken,setCartItems,navigate,backendUrl} = useContext(ShopContext);

  const logout = ()=> {
    navigate("/login")
    localStorage.removeItem("token")
    setToken("");
    setCartItems({});
  }

  return (
    <div className=' container-fluid bg-dark d-none d-md-flex text-light justify-content-around py-1'>
        <div className="left-col mt-3">
          <div>

          </div>
        Free shipping for standard order over $100
        </div>
        <div className="right-col d-flex gap-4 mt-3">
            <NavLink className="text text-white text-decoration-none">Help & FAQs</NavLink>

              {
                token === ""? 
                <NavLink to={"/login"} className="text text-white text-decoration-none">
                My account
              </NavLink>
              :
              <NavLink onClick={logout} className="text text-white text-decoration-none">
                Logout
              </NavLink>
              }

            
            <NavLink className="text text-white text-decoration-none">En</NavLink>
            <NavLink className="text text-white text-decoration-none">USD</NavLink>
        </div>
    </div>
  )
}

export default TopBar