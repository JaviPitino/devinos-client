import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { signupService } from "../../services/auth.service";

function Signup() {
  const navigate = useNavigate();
  // Estados
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
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
      image,
    };

    try {
      const response = await signupService(user);
      setImage(response.data);
      console.log(user);

      navigate("/login");
    } catch (err) {
      if (err.response.status === 400 || err.response.status === 411) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };


  return (
    <article className="container-sign">
        <form onSubmit={handleSignup}  className="form-sign-container" >
            <label className="edit-label">Nombre: </label>
            <input
              className="edit-input"
              type="text"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              autoFocus
            />
            <label className="edit-label">Email </label>
            <input
              className="edit-input"
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
            <label className="edit-label">Contraseña </label>
            <input
              className="edit-input"
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          <div className="error">
            {errorMessage !== null && <p>{errorMessage}</p>}
          </div>
          <button type="submit" className="btn-edit-perfil">Registrar</button>
        </form>
        </article>
  );
}

export default Signup;
