import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  deleteWineService,
  getWineDetailsService,
} from "../services/wines.services";
import { Form } from "react-bootstrap";
import IsAdmin from "../components/IsAdmin";
import { AuthContext } from "../context/auth.context";
import { addNewCommentService, getAllCommentsService } from "../services/comment.services";

function WinesDetails(props) {

  const { isLogin, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  // 1. Estados
  const [wineDetail, setWineDetail] = useState(null);
  const [comment, setComment ] = useState()
  // const [ allComments, setAllComments ] = useState([])

  // handlers
  const handleChangeComment = (e) => setComment(e.target.value)

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

  // Borrar wino
  const handleDelete = async () => {
    try {
      await deleteWineService(id);
      navigate("/wines");
    } catch (err) {
      navigate("/error");
    }
  };

  // Handle comentario
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const newComment = {
        comment
      }

      const response = await addNewCommentService(id, newComment);
      console.log(response.data)
      navigate(`/wines/${id}`)

    } catch(err) {
      navigate('/error')
    }
  }

  useEffect(() => {
    getAllComments()
  })

  const getAllComments = async () => {
    try {

      const showComments = await getAllCommentsService();
      console.log(showComments.data);
      // setAllComments(response.data)

    } catch(erro) {
      navigate('/error')
    }
  }

  console.log(wineDetail)

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
            <IsAdmin>
              <div className="container-btns-edit">
                <Link className="btn-edit-wine" to={`/wines/${id}/edit`}>
                  {" "}
                  Editar Vino{" "}
                </Link>
                <div className="btn-edit-wine" onClick={handleDelete}>
                  Borrar Vino
                </div>
              </div>
            </IsAdmin>
            <hr />
            {isLogin && (
              <div>
                <h6>Déjanos tu comentario</h6>
                <Form onSubmit={handleSubmit}>
                  <Form.Control
                  type="text"
                  name="comment"
                  value={comment}
                  onChange={handleChangeComment}
                  cols="60" rows="3" as="textarea" />
                  <br />
                  <button className="btn-edit-wine">Enviar</button>
                </Form>
              </div>
            )}
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
