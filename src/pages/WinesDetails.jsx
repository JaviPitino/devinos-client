import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getWineDetailsService } from "../services/wines.services";

function WinesDetails(props) {
  const navigate = useNavigate();
  const { id } = useParams();

  // 1. Estados
  const [wineDetail, setWineDetail] = useState(null);

  // 2. ComponenDIdMount
  useEffect(() => {
    getWineDetails();
  }, []);

  // 3. Llamar a la DB
  const getWineDetails = async () => {
    try {
      const response = await getWineDetailsService(id);
      setWineDetail(response.data);
    } catch (err) {
      navigate("/error");
    }
  };

  // 4. El loading o Spinner
  if (wineDetail === null) {
    return <h3>...Loading...</h3>;
  }

  return (
    <div>
      <h3 className="title">Detalles</h3>
      <div className="wine-container-det">
        <div>
          <img className="img-wine-det" src={wineDetail.image} alt="img-wine" width={120} />
        </div>
        <div className="info-wine" key={wineDetail._id}>
          <h4 className="wine-title-det">{wineDetail.name}</h4>
          {wineDetail.bodegaId}
          <p> {wineDetail.tipo}</p>
          <h6 className="wine-year">{wineDetail.year}</h6>
          {/* <h5 className="wine-rating">{rating}</h5> */}

          <p>
            {wineDetail.uva.map((item) => {
              return <span className="wine-uva">{item + ". "}</span>;
            })}
          </p>
          <p className="wine-description">{wineDetail.description}</p>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default WinesDetails;
