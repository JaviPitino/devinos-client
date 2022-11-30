import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadService from "../services/profile.service";
import { addNewWineService } from "../services/wines.services";
import { bodegasListService } from "../services/bodegas.services";
import { Form, Button } from "react-bootstrap";

function WinesCreate() {
  const navigate = useNavigate();

  // 1. Estados
  const [form, setForm] = useState({
    name: "",
    bodega: "",
    tipo: "",
    uva: [],
    year: 2020,
    description: "",
    puntuacion: 0,
  });

  const [image, setImage] = useState("");

  // Estados para mostrar las bodegas
  const [allBodegas, setAllBodegas] = useState([]);

  const uva = [
    "Syrah",
    "Tintilla de Rota",
    "Petit verdot",
    "Cabernet sauvignon",
    "Palomino fino",
    "Merlot",
    "Tempranillo",
    "Chardonnay",
  ];

  // Recoger el valor de todos los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  // Imagen
  const handleChangeImage = async (e) => {
    const uploadImage = new FormData();
    uploadImage.append("image", e.target.files[0]);

    try {
      const response = await uploadService(uploadImage);
      // console.log(response.data);
      setImage(response.data);
    } catch (err) {
      navigate("/error");
    }
  };

  // Agregar elemento a la lista
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newWine = {
        name: form.name,
        bodega: form.bodega,
        tipo: form.tipo,
        uva: form.uva,
        year: form.year,
        description: form.description,
        puntuacion: form.puntuacion,
        image,
      };

      await addNewWineService(newWine);
      navigate("/wines");
    } catch (err) {
      navigate("/error");
    }
  };

  useEffect(() => {
    getAllBodegas();
  }, []);

  const getAllBodegas = async () => {
    try {
      const response = await bodegasListService();
      console.log(response.data);
      setAllBodegas(response.data);
    } catch (err) {
      navigate("/error");
    }
  };

  return (
    <div className="form-center container-fluid">
      <div className="row col-4 map_section">
        <h4>Añade tu vino favorito</h4>

        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              name="name"
              onChange={handleChange}
              value={form.name}
              placeholder="Nombre"
            />
          </Form.Group>
          <br />
          <Form.Select
            name="bodega"
            htmlFor="bodega"
            onChange={handleChange}
            placeholder="Elige una bodega"
            value={form.bodega}
            >
            <option>Elige una bodega</option>
            {allBodegas.map((each) => {
              return(
                <option value={each._id}>{each.name}</option>
              )
            })}
          </Form.Select>
          <br />
          <Form.Select
            type="text"
            name="tipo"
            onChange={handleChange}
            value={form.tipo}
          >
            <option value="opcion1" disabled={true}>
              Elige un tipo
            </option>
            <option value="Tinto">Tinto</option>
            <option value="Rosado">Rosado</option>
            <option value="Blanco">Blanco</option>
          </Form.Select>
          <br />
          <Form.Select name="uva" onChange={handleChange} multiple>
            {uva.map((eachUva) => {
              return <option>{eachUva}</option>;
            })}
          </Form.Select>
          <br />
          <Form.Group>
            <Form.Control
              type="number"
              name="year"
              onChange={handleChange}
              value={form.year}
              default="2021"
            />
          </Form.Group>
          <br />
          <Form.Control
            placeholder="Escribe la descripción del vino..."
            type="text"
            name="description"
            onChange={handleChange}
            value={form.description}
            cols="60"
            rows="3"
            as="textarea"
          />
          <br />
          <Form.Select
            htmlFor="puntuacion"
            type="number"
            name="puntuacion"
            onChange={handleChange}
            value={form.puntuacion}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Select>
          <br />
          {/* <label htmlFor="image">Imagen</label> */}
          <Form.Group>
            <Form.Control
              type="file"
              name="image"
              onChange={handleChangeImage}
              // value={image}
            />
          </Form.Group>
          <br />
          <button variant="danger">Crear</button>
        </Form>
      </div>
    </div>
  );
}

export default WinesCreate;
