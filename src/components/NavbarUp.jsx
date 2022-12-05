import { NavLink, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import IsAdmin from "./IsAdmin";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';


function NavbarUp() {

  const { isLogin, user, authenticatedUser } = useContext(AuthContext);
  const { id } = useParams()

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

        // <nav className="navbar">
        //   <NavLink className='navbar-btn' to="/">Home</NavLink>
        //   <NavLink className='navbar-btn'to="/wines">Vinos</NavLink>
        //   <NavLink className='navbar-btn' to="/bodegas">Bodegas</NavLink>
        //   <NavLink className='navbar-btn' to="/profile">Mi perfil</NavLink>
        //   <IsAdmin>
        //     <NavLink className='navbar-btn' to="/wines/create">Añade un vino</NavLink>
        //     <NavLink className='navbar-btn' to="/bodegas/create">Añade una bodega</NavLink>
        //   </IsAdmin>
        //   <div className="btn-logout-container">
        //     <button className="btn-logout" onClick={handleLogout}>Cerrar sesión</button>
        //   </div>
        // </nav>
      
      ) : (

        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand to="/">WinesRoutes</Navbar.Brand>
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

        // <nav className="navbar">
        //   <NavLink className='navbar-btn' to="/">Home</NavLink>
        //   <NavLink className='navbar-btn'to="/wines">Vinos</NavLink>
        //   <NavLink className='navbar-btn' to="/bodegas">Bodegas</NavLink>
        //   <NavLink className='navbar-btn' to="/signup"> Registrar </NavLink>
        //   <NavLink className='navbar-btn' to="/login"> Acceder </NavLink>
        // </nav>
      )}
    </div>
  );
}

export default NavbarUp;
