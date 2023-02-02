import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadService from "../../services/profile.service";
import { addNewBodegaService } from "../../services/bodegas.services";
import { BsUpload } from "react-icons/bs";
import { winesListService } from "../../services/wines.services";
import Loading from "../../components/Loading/Loading";

function BodegasCreate() {
  const navigate = useNavigate();

  // 1. estados
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [wines, setWines] = useState([]);

  // Estado para mostrar todos los vinos en el Select del form
  const [allWines, setAllWines] = useState(null);

  // 2. handlers
  const handleNameChange = (e) => setName(e.target.value);
  const handleRegionChange = (e) => setRegion(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
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

  const handleWinesChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setWines(value);
  };

  // 3. Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newBodega = {
        name,
        region,
        description,
        wines,
        image
      };

      await addNewBodegaService(newBodega);
      navigate("/bodegas");
    } catch (err) {
      navigate("/error");
    }
  };

  useEffect(() => {
    getAllWines();
  }, []);

  const getAllWines = async () => {
    try {
      const response = await winesListService();
      // console.log(response.data)
      setAllWines(response.data);
      // setWines(response.data)
    } catch (err) {
      navigate("/error");
    }
  };

  if (!allWines) {
    return <Loading />;
  }

  console.log(allWines);

  return (
    <div className="container-edit">
        <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-edit-container">
            <input
              className="edit-input"
              type="text"
              name="name"
              onChange={handleNameChange}
              value={name}
              placeholder="Nombre"
            />
            <input
              className="edit-input"
              type="text"
              name="region"
              onChange={handleRegionChange}
              value={region}
              placeholder="Ciudad (País)"
            />
            <input
              className="edit-input"
              type="text"
              name="description"
              onChange={handleDescriptionChange}
              value={description}
              placeholder="Descripción de la bodega"
            />
          <select
            className="select-input"
            name="wines"
            onChange={handleWinesChange} 
            multiple
          >
            {allWines.map((eachwine) => {
              return (
                  <option className="option-uva" value={eachwine._id}>{eachwine.name}</option>
              );
            })}
          </select>
          <div className="container-add-label-file">
            <label className="add-label-file" htmlFor="image">
              selecciona una imagen &nbsp;&nbsp;
              <BsUpload />
              <span className="add-label-icon"></span>{" "}
            </label>
            <input
              className="edit-input"
              id="image"
              type="file"
              name="image"
              onChange={handleImageChange}
            />
          <button className="btn-edit-perfil">Crear</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BodegasCreate;
