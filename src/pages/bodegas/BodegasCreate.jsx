import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadService from "../../services/profile.service";
import { addNewBodegaService } from "../../services/bodegas.services";
import { Button, Form } from "react-bootstrap";
import { winesListService } from "../../services/wines.services";

function BodegasCreate() {
  const navigate = useNavigate();

  // 1. estados
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [wines, setWines] = useState([]);

  // Estado para mostrar todos los vinos en el Select del form
  const [allWines, setAllWines] = useState([]);

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
    setWines(value)
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
        image,
      };

      await addNewBodegaService(newBodega);
      navigate("/bodegas");
    } catch (err) {
      navigate("/error");
    }
  };

  useEffect(() => {
    getAllWines()
  }, [])

  const getAllWines = async () => {

    try {

      const response = await winesListService()
      console.log(response.data)
      setAllWines(response.data)
    } catch(err) { navigate('/error') }
  }

  if (!allWines) {
    return <h3>...loading</h3>
  }

  return (
    <div className="form-center container-fluid">
      <div className="row col-6 map_section">
      <h4>Añade una bodega</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Control
            type="text"
            name="name"
            onChange={handleNameChange}
            value={name}
            placeholder='Nombre'
          />
         </Form.Group>
         <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Control
            type="text"
            name="region"
            onChange={handleRegionChange}
            value={region}
            placeholder='Ciudad (País)'
          />
         </Form.Group>
         <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Control
            type="text"
            name="description"
            onChange={handleDescriptionChange}
            value={description}
            placeholder='Descripción de la bodega'
          />
         </Form.Group>
         <Form.Select 
          name="wines"
          onChange={handleWinesChange}
          multiple
          >
            { allWines.map((eachwine) => {
              return(
                <div key={eachwine._id}>
                  <option value={eachwine._id}>
                    {eachwine.name}
                  </option>
                </div>
              )
            })}
          </Form.Select>
          <br />
          <Form.Group>
              <Form.Control
              onChange={handleImageChange}
              type="file"
              name="image"
              width={200}
              >
              {/* Selecciona una imagen */}
              </Form.Control>
            </Form.Group> 
        <br />
        <button> Agregar Bodega </button>
        <br />
      </Form>
      </div>
    </div>
  );
}

export default BodegasCreate;
