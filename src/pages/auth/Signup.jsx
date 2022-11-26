import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signupService } from "../../services/auth.service";

function Signup() {
  
  const navigate = useNavigate()
  // Estados
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ image, setImage ] = useState("")
  const [ isAdmin, setIsAdmin ] = useState(false)

  const [errorMessage, setErrorMessage] = useState(null);

  // Eventos handlers
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
 

  // Llamada al service (axios)
  const handleSignup = async (e) => {
    e.preventDefault();

    const user = {
      username,
      email,
      password,
      image
    };

    try {

      const response = await signupService(user);
      setImage(response.data)
      console.log(user);
      
      navigate("/login")

    } catch (err) {
      if (err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div>
      <div>
        <h3>Registrar</h3>
      </div>

      <form onSubmit={handleSignup}>
        <label>Nombre: </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <br />
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <label>Contraseña: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        { errorMessage !== null && <p>{errorMessage}</p> }

      <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Signup;
