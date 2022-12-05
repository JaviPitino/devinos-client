import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  deleteWineService,
  getWineDetailsService,
  addLikesService
} from "../services/wines.services";
import IsAdmin from "../components/IsAdmin";
import CommentSection from "../components/Comments/CommentSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


function WinesDetails(props) {

  const { isLogin, user: loggedUser } = useContext(AuthContext)
  const navigate = useNavigate();
  const { id } = useParams();

  // 1. Estados
  const [ wineDetail, setWineDetail ] = useState(null);
  const [ likedWine, setLikedWine ] = useState(false);
  const [ likesId, setLikesId ] = useState([])
  const [ count, setCount ] = useState()

  
  // 2. ComponenDIdMount
  useEffect(() => {
    getWineDetails();
  }, [likesId]);

  // 3. Llamar a la DB
  const getWineDetails = async () => {
    try {
      const {data} = await getWineDetailsService(id);
      setWineDetail(data);
       setCount(data.likeCount);

    } catch (err) {
      navigate("/error");
    }
  };

  const handleLike = async (e) => {
    e.preventDefault()
    setLikedWine(!likedWine)

    try {

      const { data } = await addLikesService(id, loggedUser._id)
      setLikesId(data.likes);
      console.log(data.likes);
      console.log(loggedUser._id);
      setCount(data.likes.length);

      // const arrLikes = data.likes.find((eachLike) => eachLike === loggedUser._id)
      // console.log(arrLikes);
      // setLikesId(arrLikes)

      // if ( arrLikes === loggedUser._id ) {
      //   setLikedWine(true)
      // }

      console.log(data.likeCount);

    } catch(err) {
      navigate('/error')
    }
  }

  useEffect(() => {
    checkIfWineLiked()
  }, [])

  const checkIfWineLiked = () => {
    if ( likesId === loggedUser._id ) {
      setLikedWine(true)
    }
    console.log(likesId);
    console.log(loggedUser._id);
  }

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

  console.log(likedWine);

  return (
    <div>
      {/* <h3 className="title">Detalles</h3> */}
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
          <div className="info-wine">
            <h4 className="wine-title-det">{wineDetail.name}</h4>
            <p className="wine-type"> {wineDetail.tipo}</p>
            <h6 className="wine-year">{wineDetail.year}</h6>
            {/* <h5 className="wine-rating">{rating}</h5> */}

            <p>
              {wineDetail.uva.map((item) => {
                return <span className="wine-uva">{item + ". "}</span>;
              })}
            </p>
            <p className="wine-description">{wineDetail.description}</p>
            {likedWine ? <FontAwesomeIcon icon={faHeart} style={{color: 'red'}} type='submit' onClick={handleLike}></FontAwesomeIcon> : <FontAwesomeIcon type='submit' icon={faHeart} onClick={handleLike}></FontAwesomeIcon>}
            <span>{count}</span>
          
            <hr />
            { isLogin &&
            <>
              <IsAdmin>
                <div className="container-btns-edit">
                  <Link className="btn-edit-wine" to={`/wines/${id}/edit`}>
                    {" "}
                    Editar Vino{" "}
                  </Link>
                  <button className="btn-edit-wine" onClick={handleDelete}>
                    Borrar Vino
                  </button>
                </div>
              </IsAdmin>
              <CommentSection />
            </>
            }
            
            <br />
            <br />
          </div>
        </div>
        <div className="card-bodega">
          <h5 className="title-bodega-wine-detail">La bodega</h5>
          <div className="bodega-container-details">
            <div className="img-bodega-wine-details">
              <img
                src={wineDetail.bodega.image}
                alt="imagen de la bodega"
                width={150}
                />
            </div>
            <div>
            <span className="bodega-wine-name">{wineDetail.bodega.name}</span>
                  <p>{wineDetail.bodega.region}</p>
                  <p className="bodega-wine-description">
                    {wineDetail.bodega.description}
                  </p>
            </div>
            <Link to={`/bodegas/${wineDetail.bodega._id}`} className="leer-mas">
               Leer más
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WinesDetails;
