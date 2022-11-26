import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBodegaDetailsService } from "../../services/bodegas.services";

function BodegaDetails() {
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
      <h3 className="title">Detalles de la bodega</h3>
      <div>
        <div>
          <img src={bodegaDetails.image} alt="imagen de la bodega" />
        </div>
        <div>
          <h4>{bodegaDetails.name}</h4>
          <p>{bodegaDetails.region}</p>
          <p>{bodegaDetails.description}</p>
          <h5 className="title">
            Vinos de la bodega:
            {bodegaDetails.wines.map((eachWine) => {
              let emptyStar = "☆";
              let filledStar = "★";
      
              const rating =
                filledStar.repeat(Math.round(eachWine.puntuacion)) +
                emptyStar.repeat(5 - Math.round(eachWine.puntuacion));
              return (
                <div key={eachWine._id} className="wine-container-det">
                  <div>
                    <img
                      className="img-wine-det"
                      src={eachWine.image}
                      alt="wine image"
                      width={150}
                    />
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
          </h5>
        </div>
      </div>
    </div>
  );
}

export default BodegaDetails;
