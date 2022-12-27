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
    <div className="form-center container-fluid">
      <div className="row col-4 map_section">
        <Form onSubmit={handleSignup}>
          <Form.Group className="mb-3 label-form" controlId="exampleForm.ControlInput1">
            <Form.Label>Nombre: </Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3 label-form" controlId="exampleForm.ControlInput1">
            <Form.Label>Email: </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>
          <Form.Group className="mb-3 label-form" controlId="exampleForm.ControlInput1">
            <Form.Label>Contraseña: </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          <div className="error">
            {errorMessage !== null && <p>{errorMessage}</p>}
          </div>
          </Form.Group>
          <Button type="submit" className="btn-logout btn-sign" >Registrar</Button>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
