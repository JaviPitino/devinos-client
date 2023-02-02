import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  bodegasListService,
  getBodegaDetailsService,
  editBodegaService,
} from "../../services/bodegas.services";
import uploadService from "../../services/profile.service";
import { BsUpload } from "react-icons/bs";
import { winesListService } from "../../services/wines.services";
import Loading from "../../components/Loading/Loading";

function BodegasEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  //1. Estados
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [wines, setWines] = useState([]);

  const [allWines, setAllWines] = useState(null);

  // 2. Eventos, Handles
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newBodega = {
        name,
        region,
        description,
        wines,
        image,
      };

      await editBodegaService(id, newBodega);
      navigate(`/bodegas/${id}`);
    } catch (err) {
      navigate("/error");
    }
  };

  // ComponentDidMount
  useEffect(() => {
    getAllBodegas();
  }, []);

  const getAllBodegas = async () => {
    try {
      const response = await getBodegaDetailsService(id);
      const { name, region, description, image, wines } = response.data;

      console.log(response.data);
      setName(name);
      setRegion(region);
      setDescription(description);
      setImage(image);

      let filterArr = wines.map((each) => {
        if (allWines) return each.name;
      });
      setWines(filterArr);
      // setWines(wines)
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

      setAllWines(response.data);
    } catch (err) {
      navigate("/error");
    }
  };

  // let union = [new Set([...wines, ...allWines])]
  // console.log(union);

  console.log(wines);
  console.log(allWines);

  if (!allWines) {
    return <Loading />;
  }

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
          />

          <input
            className="edit-input"
            type="text"
            name="region"
            onChange={handleRegionChange}
            value={region}
          />
          <textarea
            className="edit-input"
            type="text"
            name="description"
            onChange={handleDescriptionChange}
            value={description}
            cols="60"
            rows="5"
          />
          <select
            className="select-input"
            name="wines"
            onChange={handleWinesChange}
            multiple
            value={wines}
            required={true}
          >
            {allWines.map((eachwine) => {
              return (
                <option className="option-uva" key={eachwine._id} value={eachwine._id}>
                  {eachwine.name}
                </option>
              );
            })}
          </select>
          <div className="container-add-label-file">
          <div className="img-wine-edit">
          {image ? (
              <img src={image} alt="winerie image" width={100} />
            ) : (
              <></>
            )}
          </div>
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
            <button className="btn-edit-perfil">Actualizar</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BodegasEdit;
