import { useEffect, useState } from "react";
import { BsUpload } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading/Loading";
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
    tipo: "",
    uva: [],
    year: 2020,
    description: "",
    puntuacion: 0,
  });

  const [image, setImage] = useState("");
  const [bodegaState, setBodegaState] = useState([]);
  const [allBodegas, setAllBodegas] = useState(null);

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

  const handleBodegaChange = (e) => setBodegaState(e.target.value);

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
        bodega: bodegaState,
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
        tipo,
        uva,
        year,
        description,
        puntuacion,
      });
      setImage(image);

      // let newBodega = bodega.map((each) => {
      //   return each.name;
      // });

      setBodegaState(bodega.name);
      console.log(bodegaState);
    } catch (err) {
      navigate("/error");
      // console.log("aqui es el error")
    }
  };

  // console.log((form.bodega))
  console.log(image);

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

  if (!allBodegas) {
    return <Loading />
  }

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
          />
          <select
            className="select-input"
            name="bodega"
            htmlFor="bodega"
            onChange={handleBodegaChange}
            required={true}
            // value={bodegaState}
          >
            <option className="select-default">Selecciona una bodega</option>
            {allBodegas.map((eachBodega) => {
              return (
                <option
                  className="select-default"
                  key={eachBodega._id}
                  value={eachBodega._id}
                >
                  {eachBodega.name}
                </option>
              );
            })}
          </select>
          <select
            className="select-input"
            name="tipo"
            htmlFor="tipo"
            onChange={handleChange}
            value={form.tipo}
          >
            <option className="select-default" value="Tinto">
              Tinto
            </option>
            <option className="select-default" value="Rosado">
              Rosado
            </option>
            <option className="select-default" value="Blanco">
              Blanco
            </option>
          </select>
          <select
            className="select-input"
            name="uva"
            htmlFor="uva"
            onChange={handleChange}
            multiple
          >
            {uva.map((eachUva) => {
              return (
                <option className="option-uva" value={form.uva} required>
                  {eachUva}
                </option>
              );
            })}
          </select>
          <input
            className="edit-input"
            type="number"
            name="year"
            onChange={handleChange}
            value={form.year}
          />
          <textarea
            className="edit-input"
            type="text"
            name="description"
            onChange={handleChange}
            value={form.description}
            cols="60"
            rows="5"
            as="textarea"
          />
          <select
            className="select-input"
            htmlFor="puntuacion"
            type="number"
            name="puntuacion"
            onChange={handleChange}
            value={form.puntuacion}
          >
            <option className="select-default" value="1">
              1
            </option>
            <option className="select-default" value="2">
              2
            </option>
            <option className="select-default" value="3">
              3
            </option>
            <option className="select-default" value="4">
              4
            </option>
            <option className="select-default" value="5">
              5
            </option>
          </select>
          <div className="container-wine-edit-label-file">
            <div className="img-wine-edit">
              <img src={image} alt="wine image" width={30} />
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
              onChange={handleChangeImage}
            />

            <button className="btn-edit-perfil">Actualizar</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default WinesEdit;
