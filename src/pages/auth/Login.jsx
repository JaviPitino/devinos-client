import React, { useState, useContext } from "react"
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
    <article className="container-sign"> 
      <form onSubmit={handleLogin} className="form-sign-container">
      <label className="edit-label">Email </label>
        <input className="edit-input" type="email" name="email" value={email} onChange={handleEmailChange} autoFocus/>
        <label className="edit-label">Contraseña </label>
        <input className="edit-input" type="password" name="password" value={password} onChange={handlePasswordChange} />
        <div className="error">
            {errorMessage !== null && <p>{errorMessage}</p>}
        </div>
        <button type="submit" className="btn-edit-perfil">Acceder</button>
      </form>
    </article>
  )
}

export default Login