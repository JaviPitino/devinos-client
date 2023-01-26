import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadService from "../services/profile.service";
import { addNewWineService } from "../services/wines.services";
import { bodegasListService } from "../services/bodegas.services";
import { BsUpload } from "react-icons/bs";

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
    <div className="container-edit">
        <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-edit-container">
            <input
              className="edit-input"
              type="text"
              name="name"
              onChange={handleChange}
              value={form.name}
              placeholder="Nombre"
            />
          <select
            className="select-input"
            name="bodega"
            htmlFor="bodega"
            onChange={handleChange}
            value={form.bodega}
            >
            <option className="select-default">Elige una bodega</option>
            {allBodegas.map((each) => {
              return(
                <option className="select-default" value={each._id}>{each.name}</option>
              )
            })}
          </select>
          <select
            className="select-input"
            type="text"
            name="tipo"
            onChange={handleChange}
            value={form.tipo}
          >
            <option className="select-default" value="opcion1" disabled={true}>
              Elige un tipo
            </option>
            <option className="select-default" value="Tinto">Tinto</option>
            <option className="select-default" value="Rosado">Rosado</option>
            <option className="select-default" value="Blanco">Blanco</option>
          </select>
          <select className="select-input" name="uva" onChange={handleChange} multiple>
            {uva.map((eachUva) => {
              return <option className="option-uva">{eachUva}</option>;
            })}
          </select>
            <input
              className="edit-input"
              type="number"
              name="year"
              onChange={handleChange}
              value={form.year}
              default="2021"
            />
          <textarea
            className="edit-input"
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
          <select
            className="select-input"
            htmlFor="puntuacion"
            type="number"
            name="puntuacion"
            onChange={handleChange}
            value={form.puntuacion}
          >
            <option className="select-default" value="1">1</option>
            <option className="select-default" value="2">2</option>
            <option className="select-default" value="3">3</option>
            <option className="select-default" value="4">4</option>
            <option className="select-default" value="5">5</option>
          </select>
          <br />
          {/* <label htmlFor="image">Imagen</label> */}
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
              onChange={handleChangeImage}
            />
          <button className="btn-edit-perfil">Crear</button>
          </div>
          </div>
        </form>
    </div>
  );
}

export default WinesCreate;
