import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

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
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/wines">Vinos</NavLink>
          <NavLink to="/bodegas">Bodegas</NavLink>

          <button onClick={handleLogout}>Cerrar sesión</button>
        
        </div>
      ) : (
        <nav>
          <NavLink to="/signup"> Registrar </NavLink>
          <NavLink to="/login"> Acceder </NavLink>


        </nav>
      )}
      {user !== null && (
        <div>
          <h3>
            Bienvenid@:{" "}
            {user.username[0].toUpperCase() + user.username.slice(1)}
          </h3>{" "}
          <p>Email: {user.email}</p>{""}
          <img src={user.image} alt="imagen de perfil" />
        </div>
      )}
    </div>
  );
}

export default Navbar;
