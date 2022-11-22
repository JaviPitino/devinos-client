import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { getProfileDetailsService } from "../services/auth.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Profile from "../pages/profile/Profile";

function Navbar() {
  const { isLogin, user, authenticatedUser } = useContext(AuthContext);

  console.log(user)

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticatedUser();
  };


  return (
    <div>
      {isLogin === true ? (
        <nav className="navbar">
          <NavLink className='navbar-btn' to="/">Home</NavLink>
          <NavLink className='navbar-btn'to="/wines">Vinos</NavLink>
          <NavLink className='navbar-btn' to="/bodegas">Bodegas</NavLink>
          <NavLink className='navbar-btn' to="/profile">Mi perfil</NavLink>

          <button onClick={handleLogout}>Cerrar sesión</button>
        
        </nav>
      ) : (
        <nav className="navbar">
          <NavLink className='navbar-btn' to="/">Home</NavLink>
          <NavLink className='navbar-btn'to="/wines">Vinos</NavLink>
          <NavLink className='navbar-btn' to="/bodegas">Bodegas</NavLink>
          <NavLink className='navbar-btn' to="/signup"> Registrar </NavLink>
          <NavLink className='navbar-btn' to="/login"> Acceder </NavLink>


        </nav>
      )}
      {/* {user !== null && (
        <div className="container-perfil">
          <h4 className="saludo">
            <NavLink to={'/profile'}>{user.username[0].toUpperCase() + user.username.slice(1)}</NavLink>  
          </h4>{" "}
          <img className="saludo" src={user.image} alt="imagen perfil" width={25}/>
        <NavLink to={`/profile/${user._id}/edit`} className="saludo"><FontAwesomeIcon icon={faPenToSquare} /></NavLink> 
        </div>
      )} */}
      
    </div>
  );
}

export default Navbar;
