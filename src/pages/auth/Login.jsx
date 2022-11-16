import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.service";
import { AuthContext } from '../../context/auth.context'


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
    <div>
      <div>
        <h3>Login</h3>
      </div>
      <form onSubmit={handleLogin}>
        <label>Email: </label>
        <input type="email" name="email" value={email} onChange={handleEmailChange} />
        <br />
        <label>Contraseña: </label>
        <input type="password" name="password" value={password} onChange={handlePasswordChange} />
        <br />
        { errorMessage !== null && <p>{errorMessage}</p> }
        <button>Acceder</button>
      </form>
    </div>
  )
}

export default Login