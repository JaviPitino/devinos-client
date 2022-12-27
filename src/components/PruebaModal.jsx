import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { signupService } from '../services/auth.service';

function Example() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate()
  // Estados
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ image, setImage ] = useState("")
  // const [ isAdmin, setIsAdmin ] = useState(false)
  // const [ showModal, setShowModal ] = useState(false)

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const modalStyles = { 
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '80vw',
    transform: 'translate(-50%, -50%)'
  }

  return (
    <>
      <Button variant="primary" className='' onClick={handleShow}>
        Soy un modal
      </Button>

      <Modal show={show} onHide={handleClose} className='modal'>
        <Modal.Header closeButton>
          <Modal.Title>regístrate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nombre: </Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId="exampleForm.ControlInput1">
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId="exampleForm.ControlInput1">
          <Form.Label>Contraseña: </Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        { errorMessage !== null && <p>{errorMessage}</p> }
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Registrar
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example