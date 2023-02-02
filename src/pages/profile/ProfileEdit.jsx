import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editProfileService,
  getProfileDetailsService,
} from "../../services/auth.service";
import uploadService from "../../services/profile.service";
import { BsUpload } from "react-icons/bs";

function ProfileEdit() {
  const navigate = useNavigate();

  const { id } = useParams();

  // **** ESTADOS ****
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState();

  // **** HANDLERS ****
  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  // **** COMPONENTDIDMOUNT ****
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await getProfileDetailsService();
      setUsername(response.data.username);
      setEmail(response.data.email);
      setImage(response.data.image);
    } catch (err) {
      navigate("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updateProfile = {
        username,
        email,
        image,
      };

      await editProfileService(id, updateProfile);
      navigate("/profile");
    } catch (err) {
      navigate("/error");
    }
  };

  const handleImageChange = async (e) => {
    const uploadForm = new FormData();
    uploadForm.append("image", e.target.files[0]);

    try {
      const response = await uploadService(uploadForm);
      setImage(response.data);
    } catch (err) {
      navigate("/error");
    }
  };

  return (
    <div className="container-edit">
      <div className="container-img-edit-label-file">
        <img className="img-edit-label-file" src={image} alt="imagen perfil" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-edit-container">
          <label className="edit-label" htmlFor="username">
            usuario{" "}
          </label>
          <input
            className="edit-input"
            type="text"
            name="username"
            onChange={handleUsername}
            value={username}
          />
          <label className="edit-label" htmlFor="email">
            email{" "}
          </label>
          <input
            className="edit-input"
            type="email"
            name="email"
            onChange={handleEmail}
            value={email}
          />
          <div className="container-edit-label-file">
            <label className="edit-label-file" htmlFor="image">
              selecciona una imagen &nbsp;&nbsp;
              <BsUpload />
              <span className="edit-label-icon"></span>{" "}
            </label>
            <input
              className="edit-input"
              id="image"
              type="file"
              name="image"
              onChange={handleImageChange}
            />
            <button className="btn-edit-perfil">Actualizar</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfileEdit;
