import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.service";
import { AuthContext } from '../../context/auth.context';
import { Form, Button } from 'react-bootstrap'


function Login() {

  const { authenticatedUser } = useContext(AuthContext)

  const navigate = useNavigate()

  // Estados
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("");

  const [ errorMessage, setErrorMessage ] = useState(null)

  // Eventos Handles
  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)
      
  // llamada al service (Axios)
  const handleLogin = async (e) => {
    e.preventDefault()

    const userIdentity = {
      email, password
    }

    try {

      // Validar el usuario
      const response = await loginService(userIdentity)

      // Guardar el token en el localStorage
      localStorage.setItem("authToken", response.data.authToken)
      authenticatedUser();
      navigate("/")

    } catch(err) {
      if ( err.response.status === 400 || err.response.status === 401 ) {
        setErrorMessage(err.response.data.errorMessage)

      } else {
        navigate("/error")
      }
    }
  }

  return (
    <div className="form-center container-fluid">
      <div className="row col-3 map_section">
        <h3>Login</h3>
      
      <Form onSubmit={handleLogin}>
      <Form.Group className="mb-4" controlId="formBasicEmail">
        <Form.Control type="email" name="email" value={email} onChange={handleEmailChange} placeholder="Inserta tu email" />
      </Form.Group>
      <Form.Group>
        <Form.Control type="password" name="password" value={password} onChange={handlePasswordChange} placeholder="Contraseña" />
      </Form.Group>
        { errorMessage !== null && <p>{errorMessage}</p> }
        <br />
        <Button type="submit" variant="danger">Acceder</Button>
      </Form>
      </div>
    </div>
  )
}

export default Login