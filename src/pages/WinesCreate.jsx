import { useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadService from "../services/profile.service";
import { addNewWineService } from "../services/wines.services";
import Select from "react-select";

function WinesCreate() {
  const navigate = useNavigate();

  // 1. Estados
  const [form, setForm] = useState({
    name: "",
    // bodegaId: {},
    tipo: "",
    uva: [],
    year: 2020,
    description: "",
    puntuacion: 0,
    image: "",
  });


  // Recoger el valor de todos los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Agregar elemento a la lista
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newWine = {
        name: form.name,
        // bodegaId: form.bodegaId,
        tipo: form.tipo,
        uva: form.uva,
        year: form.year,
        description: form.description,
        puntuacion: form.puntuacion,
        image: form.image,
      };

      await addNewWineService(newWine);
      navigate("/wines");
    } catch (err) {
      navigate("/error");
    }
  };

  // Imagen
  const handleChangeImage = async (e) => {
    const uploadImage = new FormData();
    uploadImage.append("image", e.target.files[0]);

    try {
      const response = await uploadService(uploadImage);
      console.log(response.data);
      setForm({ image: response.data });
    } catch (err) {
      navigate("/error");
    }
  };

  return (
    <div>
      <div>
        <h4>Añade tu vino favorito</h4>

        <form onSubmit={handleSubmit}>
          <label>Nombre: </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={form.name}
            placeholder="Nombre"
          />
          <br />
          <label>Bodega: </label>
          <select
            name="bodegaId"
            htmlFor="bodegaId"
            onChange={handleChange}
            value={form.bodegaId}
          >
            <option value="en-blanco"></option>
            <option value="Tesalia">Tesalia</option>
            <option value="bodegas-barbadillo">Bodegas Barbadillo</option>
            <option value="huerta-de-albala">Huerta de Albalá</option>
            <option value="luis-perez">Bodegas Luis Pérez</option>
            <option value="finca-moncloa">
              Fincla Moncloa (Grupo González Byass)
            </option>
            <option value="carvajal-wines">Carvajal wines</option>
            <option value="valdespino">Valdespino (Grupo Estévez)</option>
            <option value="preadorey">Bodegas Pradorey</option>
            <option value="vina-sastre">Viña Sastre</option>
          </select>
          <br />
          <label>Tipo</label>
          <select
            type="text"
            name="tipo"
            onChange={handleChange}
            value={form.tipo}
          >
            <option value="Tinto">Tinto</option>
            <option value="Rosado">Rosado</option>
            <option value="Blanco">Blanco</option>
          </select>
          <br />
          <label>Tipo de uva: </label>
          <select
            name="uva"
            onChange={handleChange}
            value={form.uva}
            multiple
            // options={form.uva}
          >
            <option value="syrah">Syrah</option>
            <option value="tintilla">Tintilla de Rota</option>
            <option value="petit-verdot">Petit verdot</option>
            <option value="cabernet">Cabernet sauvignon</option>
            <option value="palomino">Palomino fino</option>
            <option value="merlot">Merlot</option>
            <option value="tempranillo">Tempranillo</option>
            <option value="chardonnay">Chardonnay</option>
          </select>
          <br />
          <label>Año: </label>
          <input
            type="number"
            name="year"
            onChange={handleChange}
            value={form.year}
            default="2021"
          />
          <br />
          <label>Description: </label>
          <textarea
            placeholder="Escribe la descripción del vino..."
            type="text"
            name="description"
            onChange={handleChange}
            value={form.description}
            cols="60"
            rows="3"
          ></textarea>
          <br />
          <label>Puntuación</label>
          <select
            type="number"
            name="puntuacion"
            onChange={handleChange}
            value={form.value}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <br />
          <label htmlFor="image">Imagen</label>
          <input
            type="file"
            name="image"
            onChange={handleChangeImage}
            value={form.image}
          />
          <img src={form.image} alt="imagen de perfil" width={150} />
          <br />
          <button>Crear</button>
        </form>
      </div>
    </div>
  );
}

export default WinesCreate;
