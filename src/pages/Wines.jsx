import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { winesListService } from "../services/wines.services";
import { Button } from "react-bootstrap";
import Search from "../components/Search";

function Wines() {
  const navigate = useNavigate();

  // 1. Crear estados
  const [wines, setWines] = useState([]);
  // const [ newSearch, setNewSearch ] = useState("")
  const [allWinesToDisplay, setAllWinesToDisplay] = useState([]);

  // 2. ComponentDidMount
  useEffect(() => {
    getAllWines();
  }, []);

  // 3. Funcion que busca la Data en la API
  const getAllWines = async () => {
    try {
      const response = await winesListService();
      setWines(response.data);
      setAllWinesToDisplay(response.data);
      // console.log(response.data);
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
    const winesCopyList = [...wines];
    const filterArrTinto = winesCopyList.filter(
      (eachWine) => eachWine.tipo === "Tinto"
    );
    setAllWinesToDisplay(filterArrTinto);
    // setNewSearch("")
  };

  // Filtrar rosados
  const HandleFilterRosados = () => {
    const winesCopyList = [...wines];
    const filterArrTinto = winesCopyList.filter(
      (eachWine) => eachWine.tipo === "Rosado"
    );
    setAllWinesToDisplay(filterArrTinto);
    // setWines(wines)
    // setNewSearch("")
  };

  // Filtrar rosados
  const HandleFilterBlancos = () => {
    const winesCopyList = [...wines];
    const filterArrTinto = winesCopyList.filter(
      (eachWine) => eachWine.tipo === "Blanco"
    );
    setAllWinesToDisplay(filterArrTinto);
    // setWines(wines)
    // setNewSearch("")
  };

  // Mostrar todos
  const handleAllWines = () => {
    const winesCopyList = [...wines];
    setAllWinesToDisplay(winesCopyList);
    // setWines(wines)
    // setNewSearch("")
  };

  // Ordenar
  const handleSort = () => {
    const winesCopyList = [...allWinesToDisplay];
    let newSortedList = winesCopyList.sort((elem1, elem2) =>
      elem1.name > elem2.name ? 1 : elem1.name < elem2.name ? -1 : 0
    );
    if (newSortedList[0] === allWinesToDisplay[0]) {
      newSortedList = [...allWinesToDisplay].sort((elem2, elem1) =>
        elem1.name > elem2.name ? 1 : elem1.name < elem2.name ? -1 : 0
      );
    }
    setAllWinesToDisplay(newSortedList);
  };

  // Search
  const searchList = (search) => {
    const winesCopyList = [...wines];
    const filterArr = winesCopyList.filter((eachWine) => {
      return eachWine.name.toUpperCase().includes(search.toUpperCase());
    });
    setAllWinesToDisplay(filterArr);
    // setWines(wines)
    // setNewSearch("")
  };

  if (!wines) {
    return <h3>...Loading</h3>;
  }

  return (
    <div>
      <Search searchList={searchList} />
      <button
        className="btn-edit-wine"
        onClick={handleAllWines}
        variant="danger"
      >
        Todos
      </button>
      <button className="btn-edit-wine" onClick={HandleFilterTintos}>
        Tintos
      </button>
      <button className="btn-edit-wine" onClick={HandleFilterRosados}>
        Rosados
      </button>
      <button className="btn-edit-wine" onClick={HandleFilterBlancos}>
        Blancos
      </button>
      <button className="btn-filtrar" onClick={handleSort}>
        Ordenar
      </button>
      <br />
      <br />

      {allWinesToDisplay.map((eachWine) => {
        let emptyStar = "☆";
        let filledStar = "★";

        const rating =
          filledStar.repeat(Math.round(eachWine.puntuacion)) +
          emptyStar.repeat(5 - Math.round(eachWine.puntuacion));

        return (
          <div className="super-container">
            <div className="wine-container" key={eachWine._id}>
              <div className="img-wine">
                <img src={eachWine.image} alt="wine" width={50} />
              </div>
              <div className="info-wine" key={eachWine._id}>
                <Link to={`/wines/${eachWine._id}`}>
                  <h4 className="wine-title">{eachWine.name}</h4>
                </Link>
                <Link
                  to={`/bodegas/${eachWine.bodega._id}`}
                  className="bodega-name-wines"
                >
                  Bodega: {eachWine.bodega.name}{" "}
                  <span className="flechita"> &nbsp; //</span>{" "}
                </Link>
                <p> {eachWine.tipo}</p>
                <h6 className="wine-year">{eachWine.year}</h6>
                <h5 className="wine-rating">{rating}</h5>

                <p>
                  {eachWine.uva.map((item, i) => {
                    return (
                      <span key={i} className="wine-uva">
                        {item + ". "}
                      </span>
                    );
                  })}
                </p>
                <br />
                <br />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Wines;
