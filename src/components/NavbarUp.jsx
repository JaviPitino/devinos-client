import { NavLink } from "react-router-dom";
import { useContext } from "react";
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
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand as={NavLink} to="/">WinesRoutes</Navbar.Brand>
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
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand as={NavLink} to="/">WinesRoutes</Navbar.Brand>
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
