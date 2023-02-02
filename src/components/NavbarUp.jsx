import { NavLink } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import IsAdmin from "./IsAdmin";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';


function NavbarUp({ handleShowModal }) {

  const { isLogin, authenticatedUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticatedUser();
  };
  
  return (
    <div>
      {isLogin === true ? (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={NavLink} src={"../devinos-logo-black.png"} to="/">
            <img src="https://res.cloudinary.com/dttp09igh/image/upload/v1673272915/wines-routes/logo-devinos-bold_rha6ba.png" alt="logo-devinos" width={120} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink className='navbar-btn' to="/wines">Vinos</NavLink>
              <NavLink className='navbar-btn' to="/bodegas">Bodegas</NavLink>
              <NavLink className='navbar-btn' to="/profile">Mi perfil</NavLink>
              <NavLink className='navbar-btn' to="/wishlist">Mi Lista de favoritos</NavLink>
              <IsAdmin>
                <NavDropdown className='navbar-btn dropdown' title="Admin" id="collasible-nav-dropdown">
                  <NavDropdown.Item as={NavLink} className="navbar-btn dropdown-items" to="/wines/create">Añadir un Vino</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} className='navbar-btn dropdown-items' to="/bodegas/create">
                    Añadir una bodega
                  </NavDropdown.Item>
                </NavDropdown>
              </IsAdmin>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">
              <div className="btn-logout-container">
                  <button className="btn-logout" onClick={handleLogout}>Cerrar sesión</button>
              </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        </Navbar>
      ) : (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
          <img src="https://res.cloudinary.com/dttp09igh/image/upload/v1673272915/wines-routes/logo-devinos-bold_rha6ba.png" width={120} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink className='navbar-btn'to="/wines">Vinos</NavLink>
              <NavLink className='navbar-btn' to="/bodegas">Bodegas</NavLink>
            </Nav>  
            <Nav>
              <NavLink className='navbar-btn' to="/signup">Registrar</NavLink>
              <NavLink className='navbar-btn' to="/login">Acceder</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
        </Navbar>
      )}
    </div>
  );
}

export default NavbarUp;
