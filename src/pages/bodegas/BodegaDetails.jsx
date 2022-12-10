import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteBodegaService,
  getBodegaDetailsService,
} from "../../services/bodegas.services";
import IsAdmin from "../../components/IsAdmin";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../context/auth.context";

function BodegaDetails() {
  const { isLogin } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Estados
  const [bodegaDetails, setBodegaDetails] = useState(null);

  // 2. ComponentDidMount
  useEffect(() => {
    getBodegaDetails();
  }, []);

  const getBodegaDetails = async () => {
    try {
      const response = await getBodegaDetailsService(id);
      setBodegaDetails(response.data);
      console.log(response.data);
    } catch (err) {
      navigate("/error");
    }
  };

  // Borrar Bodega
  const handleDelete = async () => {
    try {
      await deleteBodegaService(id);
      navigate("/bodegas");
    } catch (err) {
      navigate("/error");
    }
  };

  // Loading o spinner
  if (!bodegaDetails) {
    return <h3>...Loading</h3>;
  }

  return (
    <div>
      {isLogin && (
        <IsAdmin>
          <div className="container-btns-edit centered">
            <Link className="edit-bodega-btn" to={`/bodegas/${id}/edit`}>
              {" "}
              <button className="btn-edit-wine">Editar</button>{" "}
            </Link>
            <button className="btn-edit-wine" onClick={handleDelete}>
              Borrar
            </button>
          </div>
        </IsAdmin>
      )}
      <div className="container-grande">
        <div>
          <img className="img-winerie-big" src={bodegaDetails.image} alt="winerie image" width={400} />
        </div>
        <div>
          <h4 className="title-bodega-wine-detail2">{bodegaDetails.name}</h4>
          <p className="winerie-region2">{bodegaDetails.region}</p>
          <p className='winerie-description'>{bodegaDetails.description}</p>
        </div>
      </div>
        <h5 className="title-other-wines">Vinos de la bodega:</h5>
      <div className="wineries-container-det">
        {bodegaDetails.wines.map((eachWine) => {
          let emptyStar = "☆";
          let filledStar = "★";

          const rating =
            filledStar.repeat(Math.round(eachWine.puntuacion)) +
            emptyStar.repeat(5 - Math.round(eachWine.puntuacion));
          return (
            <div key={eachWine._id} className="wineries-container-det">
              <div>
              <Link to={`/wines/${eachWine._id}`}>
                <img
                  className="img-winerie-det"
                  src={eachWine.image}
                  alt="wine image"
                />
                </Link>
              </div>
              <div>
                <span className="bodega-wine-name">{eachWine.name}</span>
                <p className="bodega-wine-year">{eachWine.year}</p>
                <p className="bodega-wine-details-tipo">{eachWine.tipo}</p>
                <p>{rating}</p>
                <br />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BodegaDetails;
