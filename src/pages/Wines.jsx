import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { winesListService } from "../services/wines.services";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'

function Wines() {
  const navigate = useNavigate();

  // 1. Crear estados
  const [wines, setWines] = useState([]);

  const [ allWinesToDisplay, setAllWinesToDisplay ] = useState([])

  // 2. ComponentDidMount
  useEffect(() => {
    getAllWines();
  }, []);

  // 3. Funcion que busca la Data en la API
  const getAllWines = async () => {
    try {
      const response = await winesListService();
      setWines(response.data);
      setAllWinesToDisplay(response.data)
      console.log(response.data);
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    }
  };

  // Filtrar tintos
  const HandleFilterTintos = () => {
    const winesCopyList = [...wines]
    const filterArrTinto = winesCopyList.filter((eachWine) => eachWine.tipo === 'Tinto')
    setAllWinesToDisplay(filterArrTinto)
  }

  // Filtrar rosados
  const HandleFilterRosados = () => {
    const winesCopyList = [...wines]
    const filterArrTinto = winesCopyList.filter((eachWine) => eachWine.tipo === 'Rosado')
    setAllWinesToDisplay(filterArrTinto)
  }

  // Filtrar rosados
  const HandleFilterBlancos = () => {
    const winesCopyList = [...wines]
    const filterArrTinto = winesCopyList.filter((eachWine) => eachWine.tipo === 'Blanco')
    setAllWinesToDisplay(filterArrTinto)
  }

  // Mostrar todos
  const handleAllWines = () => {
    const winesCopyList = [...wines]
    setAllWinesToDisplay(winesCopyList)
  }

  // Ordenar
  const handleSort = () => {
    const winesCopyList = [...allWinesToDisplay];
    let newSortedList = winesCopyList.sort((elem1, elem2) => (elem1.name > elem2.name ? 1 : elem1.name < elem2.name ? -1 : 0));
    if(newSortedList[0] === allWinesToDisplay[0]) {
      newSortedList = [...allWinesToDisplay].sort((elem2, elem1) => (elem1.name > elem2.name ? 1 : elem1.name < elem2.name ? -1 : 0))
    }
    setAllWinesToDisplay(newSortedList);
  };

  if (!wines) {
    return <h3>...Loading</h3>;
  }

  return (
    <div>
      <h3 className="title">Vinos disponibles</h3>
      <Button className="btn-filtrar" onClick={handleAllWines} variant="danger">Todos</Button>
      <Button className="btn-filtrar"  onClick={HandleFilterTintos} variant="outline-danger">Tintos</Button>
      <Button className="btn-filtrar"  onClick={HandleFilterRosados} variant="outline-danger">Rosados</Button>
      <Button className="btn-filtrar" onClick={HandleFilterBlancos} variant="outline-danger">Blancos</Button>
      <Button className="btn-filtrar" onClick={handleSort}>Ordenar</Button>
      <br />
      <br />

      {allWinesToDisplay.map((eachWine) => {
        let emptyStar = "☆";
        let filledStar = "★";

        const rating =
          filledStar.repeat(Math.round(eachWine.puntuacion)) +
          emptyStar.repeat(5 - Math.round(eachWine.puntuacion));

        return (
          
          <div className="wine-container" key={eachWine._id}>
            <Link to={`/wines/${eachWine._id}`}>
            <div className="img-wine">
              <img src={eachWine.image} alt="wine" width={50} />
            </div>
            <div className="info-wine" key={eachWine._id}>
              <h4 className="wine-title" >{eachWine.name}</h4>
              
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
