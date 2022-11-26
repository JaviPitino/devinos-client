import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { bodegasListService } from "../services/bodegas.services";
import uploadService from "../services/profile.service";
import {
  editWineService,
  getWineDetailsService,
} from "../services/wines.services";

function WinesEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  //1. Estados
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

  //2. Eventos handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleChangeImage = async (e) => {
    const uploadImage = new FormData();
    uploadImage.append("image", e.target.files[0]);

    try {
      const response = await uploadService(uploadImage);
      setImage(response.data);

    } catch (err) {
      navigate("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const theWine = {
        name: form.name,
        bodega: form.bodega,
        tipo: form.tipo,
        uva: form.uva,
        year: form.year,
        description: form.description,
        puntuacion: form.puntuacion,
        image,
      };

      await editWineService(id, theWine);
      navigate(`/wines/${id}`);
    } catch (err) {
      navigate("/error");
    }
  };

  // ComponentDidMount
  useEffect(() => {
    getWineDetails();
  }, []);

  const getWineDetails = async () => {
    try {
      const response = await getWineDetailsService(id);
      const { name, bodega, tipo, uva, year, description, puntuacion, image } =
        response.data;

      setForm({
        name,
        bodega,
        tipo,
        uva,
        year,
        description,
        puntuacion,
        image,
      });
    } catch (err) {
      navigate("/error");
    }
  };

  // console.log((form.bodega))
  console.log(image)


  // Llamar al axios de las bodegas
  useEffect(() => {
    getAllBodegas();
  }, []);

  const getAllBodegas = async () => {
    try {
      const response = await bodegasListService();
      setAllBodegas(response.data);
    } catch (err) {
      navigate("/error");
    }
  };

  return (
    <div className="form-center container-fluid">
      <div className="row col-6 map_section">
        <h4>Editar vino</h4>

        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              name="name"
              onChange={handleChange}
              value={form.name}
            />
          </Form.Group>
          <br />
          <Form.Select
            name="bodega"
            htmlFor="bodega"
            onChange={handleChange}
            value={form.bodega}
          >
            {allBodegas.map((eachBodega) => {
              return <option value={eachBodega._id}>{eachBodega.name}</option>;
            })}
          </Form.Select>
          <br />
          <Form.Select
            name="tipò"
            htmlFor="tipo"
            onChange={handleChange}
            value={form.tipo}
          >
            <option value="Tinto">Tinto</option>
            <option value="Rosado">Rosado</option>
            <option value="Blanco">Blanco</option>
          </Form.Select>
          <br />
          <Form.Select
            name="uva"
            htmlFor="uva"
            onChange={handleChange}
            value={form.uva}
            multiple
          >
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
            />
          </Form.Group>
          <br />
          <Form.Control 
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
          <Form.Group>
            <Form.Control
              type="file"
              name="image"
              onChange={handleChangeImage}
              // value={image}
            />
            <img src={image} alt="wine image" width={50}/>
          </Form.Group>
          <br />
          <button variant="danger">Actualizar</button>
        </Form>
      </div>
    </div>
  );
}

export default WinesEdit;
