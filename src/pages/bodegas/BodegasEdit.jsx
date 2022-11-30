import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bodegasListService, getBodegaDetailsService, editBodegaService } from "../../services/bodegas.services";
import uploadService from "../../services/profile.service";
import { Form } from 'react-bootstrap'
import { winesListService } from "../../services/wines.services";

function BodegasEdit() {

  const navigate = useNavigate();
  const { id } = useParams()

  //1. Estados
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [wines, setWines] = useState([])

  const [allWines, setAllWines] = useState([]);

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
    e.preventDefault()

    try {
      const newBodega = {
        name,
        region,
        description,
        wines,
        image
      };

      await editBodegaService(id, newBodega);
      navigate(`/bodegas/${id}`)

    } catch(err) {
      navigate('/error')
    }
  }

  // ComponentDidMount
  useEffect(() => {
    getAllBodegas()
  }, [])

  const getAllBodegas = async () => {

    try {
      const response = await getBodegaDetailsService(id);
      const { name, region, description, image, wines } = response.data;

      console.log(response.data)
      setName(name)
      setRegion(region)
      setDescription(description)
      setImage(image)
      setWines(wines)

    } catch(err) {
      navigate('/error')
    }
  }

  useEffect(() => {
    getAllWines()
  }, [])

  const getAllWines = async () => {
    try {
      const response = await winesListService();
      
      setAllWines(response.data)

    }catch(err) {
      navigate('/error')
    }
  }

  if (!allWines) {
    return <h3>...loading</h3>;
  }

  return (
    <div className="form-center container-fluid">
      <div className="row col-6 map_section">
        <h4>Editar bodega</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Control
              type="text"
              name="name"
              onChange={handleNameChange}
              value={name}
              placeholder="Nombre"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Control
              type="text"
              name="region"
              onChange={handleRegionChange}
              value={region}
              placeholder="Ciudad (País)"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Control
              type="text"
              name="description"
              onChange={handleDescriptionChange}
              value={description}
              placeholder="Descripción de la bodega"
            />
          </Form.Group>
          <Form.Label>
            Selecciona el vino o los vinos de la bodega
          </Form.Label>
          <Form.Select name="wines" onChange={handleWinesChange} multiple >
            {allWines.map((eachwine) => {
              return (
      
                  <option key={eachwine._id} value={eachwine._id}>{eachwine.name}</option>
              );
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
          <button> Actualizar bodega </button>
          <br />
        </Form>
      </div>
    </div>
  
  
    )
}

export default BodegasEdit;
