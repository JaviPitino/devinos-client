import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getWineDetailsService } from "../services/wines.services";
import IsAdmin from '../components/IsAdmin'

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
    <div className="container-grande">
      <div className="wine-container-det">
        <div>
          <img
            className="img-wine-det"
            src={wineDetail.image}
            alt="img-wine"
            width={120}
          />
        </div>
        <div className="info-wine" key={wineDetail._id}>
          <h4 className="wine-title-det">{wineDetail.name}</h4>
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
          <IsAdmin>
            <Link to={`/wines/${id}/edit`}> <button>Editar</button> </Link>  
          </IsAdmin>
        </div>
      </div>
      <div className="card-bodega">
        <h5 className="title-bodega-wine-detail">La bodega</h5> 
        {wineDetail.bodega.map((eachBodega) => {
          return (
            <div key={eachBodega._id} className="bodega-container-details" >
              <div  className="img-bodega-wine-details">
                <img src={eachBodega.image} alt="imagen de la bodega" width={150} />
              </div>
              <div>
                <span className="bodega-wine-name">{eachBodega.name}</span>
                <p>{eachBodega.region}</p>
                <p className="bodega-wine-description">{eachBodega.description}</p>
              </div>
              <Link to={`/bodegas/${eachBodega._id}`} className="leer-mas">Leer más</Link>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}

export default WinesDetails;
