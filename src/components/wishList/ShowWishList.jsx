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

  const [winesWished, setWineWished] = useState([]);

  useEffect(() => {
    showWishList();
  }, []);

  const showWishList = async () => {
    try {
      const { data } = await getWishlistService(id, user._id);
      setWineWished(data.wishlist);
    } catch (err) {
      navigate("/error");
    }
  };

  console.log(winesWished);

  return (
    <div>
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
                  <span>
                    {" "}
                    {item.tipo} | {item.year}
                  </span>
                  <div className="wish-likes-container">
                  {item.likes.length === 0 ? (
                    <BsHeart className="heart" />
                  ) : (
                    <BsHeartFill className="heart" style={{color: '#bb1919'}} />
                  )}
                  {item.likes.length === 1 ? (
                    <>
                      <span className="wish-likes">
                        A <strong>{item.likes.length}</strong> persona le gusta
                        este vino
                      </span>
                    </>
                  ) : (
                    <span className="wish-likes">
                      A <strong>{item.likes.length}</strong> personas les gusta
                      este vino
                    </span>
                  )}
                  </div>
                </div>
                {/* < DeleteWineWishList /> */}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ShowWishList;
