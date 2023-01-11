import React from "react";
import "./footer.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function Footer() {
  const { isLogin } = useContext(AuthContext);

  return (
    <div className="footer-container">
      <div className="col">
        <div className="firma">
            &copy; Created & designed by <strong>Javier López</strong>
        </div>
      </div>
      <div className="col2">
        <img
          src="https://res.cloudinary.com/dttp09igh/image/upload/v1673272916/wines-routes/logo-devinos-brand-bold_zgeud2.png"
          alt="logo-devinos"
          width={40}
        />
      </div>
      <div className="col3">
        {isLogin === true ? (
          <div className="list-footernav">
            <Link className="link-footer" to={"/wines"}>
              Vinos
            </Link>
            <Link className="link-footer" to={"/bodegas"}>
              Bodegas
            </Link>
            <Link className="link-footer" to={"/profile"}>
              Mi perfil
            </Link>
            <Link className="link-footer" to={"/wishlist"}>
              Mi lista de favoritos
            </Link>
          </div>
        ) : (
          <div className="list-footernav">
            <Link className="link-footer" to={"/wines"}>
              Vinos
            </Link>
            <Link className="link-footer" to={"/bodegas"}>
              Bodegas
            </Link>
            <Link className="link-footer" to={"/signup"}>
              Registrar
            </Link>
            <Link className="link-footer" to={"/login"}>
              Acceder
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Footer;
