import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { winesListService } from "../services/wines.services";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons'

function Wines() {
  const navigate = useNavigate();

  // 1. Crear estados
  const [wines, setWines] = useState([]);

  // const [ allWinesToDisplay, setAllWinesToDisplay ] = useState([])

  // 2. ComponentDidMount
  useEffect(() => {
    getAllWines();
  }, {});

  // 3. Funcion que busca la Data en la API
  const getAllWines = async () => {
    try {
      const response = await winesListService();
      setWines(response.data);
      console.log(response.data);
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    }
  };

  if (!wines) {
    return <h3>...Loading</h3>;
  }

  return (
    <div>
      <h3 className="title">Vinos disponibles</h3>
      {wines.map((eachWine) => {
        let emptyStar = "☆";
        let filledStar = "★";

        const rating =
          filledStar.repeat(Math.round(eachWine.puntuacion)) +
          emptyStar.repeat(5 - Math.round(eachWine.puntuacion));

        return (
          <div className="wine-container">
            <Link to={`/wines/${eachWine._id}`}>
            <div className="img-wine">
              <img src={eachWine.image} alt="wine" width={50} />
            </div>
            <div className="info-wine" key={eachWine._id}>
              <h4 className="wine-title" >{eachWine.name}</h4>
              {eachWine.bodegaId}
              <p> {eachWine.tipo}</p>
              <h6 className="wine-year" >{eachWine.year}</h6>
              <h5 className="wine-rating" >{rating}</h5>
              
              <p>
                {eachWine.uva.map((item) => {
                  return <span className="wine-uva">{item + ". "}</span>;
                })}
              </p>
              <br />
              <br />
            </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Wines;
