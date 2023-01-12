import React, { useContext, useEffect, useState } from "react";
import "./wishlist.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { getWishlistService } from "../../services/auth.service";
import { BsHeartFill, BsHeart } from "react-icons/bs";

function ShowWishList() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  let { id } = useParams();

  // Estado que añade la lista de vinos favoritos
  const [winesWished, setWineWished] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ComponentDidmount
  useEffect(() => {
    showWishList();
  }, []);

  // Llamada a la DB para conseguir la lista de favoritos dentro del usuario
  const showWishList = async () => {
    try {
      const { data } = await getWishlistService(id, user._id);
      setWineWished(data.wishlist);
      setIsLoading(false);
    } catch (err) {
      navigate("/error");
    }
  };

  // spinner loading
  if (isLoading === true) {
    return <h3>...Loading...</h3>;
  }

  return (
    <div>
      {winesWished.length === 0 ? (
        <h5 className="message-wishlist">
          No tienes ningún vino favorito en tu bodega
        </h5>
      ) : (
        <>
          {winesWished.map((item) => {
            return (
              <div className="super-container">
                <Link to={`/wines/${item._id}`}>
                  <div className="wish-container" key={item._id}>
                    <div className="img-wish">
                      <img src={item.image} alt="bottle" width={20} />
                    </div>
                    <div className="fav-info">
                      <h4 className="title-wish">{item.name}</h4>
                      <span className="wish-tipo">
                        {" "}
                        {item.tipo} | {item.year}
                      </span>
                      <div className="wish-likes-container">
                        {item.likes.length === 0 ? (
                          <BsHeart className="heart" />
                        ) : (
                          <BsHeartFill
                            className="heart"
                            style={{ color: "#bb1919" }}
                          />
                        )}
                        {item.likes.length === 1 ? (
                          <>
                            <span className="wish-likes">
                              A <strong>{item.likes.length}</strong> persona le
                              gusta este vino
                            </span>
                          </>
                        ) : (
                          <span className="wish-likes">
                            A <strong>{item.likes.length}</strong> personas les
                            gusta este vino
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default ShowWishList;
