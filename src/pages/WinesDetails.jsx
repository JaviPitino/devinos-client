import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  deleteWineService,
  getWineDetailsService,
} from "../services/wines.services";
import IsAdmin from "../components/IsAdmin";
import Likes from "../components/Likes/Likes";
import ShowComments from "../components/Comments/ShowComments";
import WishList from "../components/wishList/WishList";

function WinesDetails() {
  const { isLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  // 1. Estados
  const [wineDetail, setWineDetail] = useState(null);

  // 2. ComponenDidMount
  useEffect(() => {
    getWineDetails();
  }, []);

  // 3. Llamada a la DB
  const getWineDetails = async () => {
    try {
      const { data } = await getWineDetailsService(id);
      setWineDetail(data);
    } catch (err) {
      navigate("/error");
    }
  };

  // Borrar wino
  const handleDelete = async () => {
    try {
      await deleteWineService(id);
      navigate("/wines");
    } catch (err) {
      navigate("/error");
    }
  };

  // 4. El loading o Spinner
  if (wineDetail === null) {
    return <h3>...Loading...</h3>;
  }

  return (
    <section className="container-grande">
      <div className="info-wine-big">
        
        <div className="wine-container-det">
          <header className="wine-header">
          <div>
            <img
              className="img-wine-det"
              src={wineDetail.image}
              alt="img-wine"
            />
          </div>
          <div className="info-wine">
            <h4 className="wine-title-det">{wineDetail.name}</h4>
            <p className="wine-type"> {wineDetail.tipo}</p>
            <h6 className="wine-year">{wineDetail.year}</h6>
            {/* <h5 className="wine-rating">{rating}</h5> */}

            <p className="wine-uva">
              {wineDetail.uva.map((item, i) => {
                return (
                  <span key={i} className="wine-uva">
                    {item + ". "}
                  </span>
                );
              })}
            </p>
          </div>
          </header>
          <article className="info-wine">
            <p className="wine-description">{wineDetail.description}</p>
            {isLogin && (
          <>
            <IsAdmin>
              <div className="container-btns-edit">
                <Link
                  className="btn-edit-wine separador"
                  to={`/wines/${id}/edit`}
                >
                  {" "}
                  Editar Vino{" "}
                </Link>
                <button
                  className="btn-edit-wine separador"
                  onClick={handleDelete}
                >
                  Borrar Vino
                </button>
              </div>
            </IsAdmin>
            {/* <CommentSection /> */}
          </>
        )}
            
            {isLogin && (
              <>
                <div className="likes-wishlist">
                  <Likes wineDetail={wineDetail} reload={getWineDetails} />
                  <WishList wineDetail={wineDetail} reload={getWineDetails} />
                </div>
                <ShowComments />
              </>
            )}
            <hr />
          </article>
        </div>
      </div>

      <div className="card-bodega">
        <h5 className="title-bodega-wine-detail">La bodega</h5>
        <div className="bodega-container-details">
          <div className="img-bodega-wine-details">
            <img
              className="img-bodega-detail"
              src={wineDetail.bodega.image}
              alt="imagen de la bodega"
              width={250}
            />
          </div>
          <div className="container-bodega-text">
            <span className="bodega-wine-name">{wineDetail.bodega.name}</span>
            <p className="bodega-wine-region">{wineDetail.bodega.region}</p>
            <p className="bodega-wine-description">
              {wineDetail.bodega.description}
            </p>
            <Link to={`/bodegas/${wineDetail.bodega._id}`} className="leer-mas">
              Leer más
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WinesDetails;
