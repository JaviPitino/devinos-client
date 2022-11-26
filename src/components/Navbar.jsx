import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import IsAdmin from "./IsAdmin";

function Navbar() {
  const { isLogin, user, authenticatedUser } = useContext(AuthContext);

  
  
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticatedUser();
  };
  
  console.log(user)
  console.log(isLogin)
  return (
    <div>
      {isLogin === true ? (
        <nav className="navbar">
          <NavLink className='navbar-btn' to="/">Home</NavLink>
          <NavLink className='navbar-btn'to="/wines">Vinos</NavLink>
          <NavLink className='navbar-btn' to="/bodegas">Bodegas</NavLink>
          <NavLink className='navbar-btn' to="/profile">Mi perfil</NavLink>
          <IsAdmin>
            <NavLink className='navbar-btn' to="/wines/create">Añade un vino</NavLink>
            <NavLink className='navbar-btn' to="/bodegas/create">Añade una bodega</NavLink>
          </IsAdmin>
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
