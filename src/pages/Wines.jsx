import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { winesListService } from "../services/wines.services";

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
      <h3>Lista de vinos</h3>
      {wines.map((eachWine) => {
        let emptyStar = "☆";
        let filledStar = "★";

        const rating =
          filledStar.repeat(Math.round(eachWine.puntuacion)) +
          emptyStar.repeat(5 - Math.round(eachWine.puntuacion));
        return (
          <div>
            <div>
              <img src={eachWine.image} alt="wine" width={50} />
            </div>
            <div key={eachWine._id}>
              <h4>{eachWine.name}</h4>
              {eachWine.bodegaId}
              <p> {eachWine.tipo}</p>
              <h6>{eachWine.year}</h6>
              <h5>{rating}</h5>
              <span>
                {eachWine.uva.map((item) => {
                  return <span>{item + " | "}</span>;
                })}
              </span>
              <br />
              <br />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Wines;
