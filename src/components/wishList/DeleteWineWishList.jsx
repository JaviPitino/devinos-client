import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import {
  getWishlistService,
  deleteWineWishListService,
} from "../../services/auth.service";

function DeleteWineWishList() {
  const [winesWished, setWineWished] = useState([]);

  const { user: loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();
  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    showItemsWishlist();
  }, []);

  const showItemsWishlist = async () => {
    try {
      const { data } = await getWishlistService(id, loggedUser._id);

      console.log(data.wishlist);
      setWineWished(data.wishlist);
    } catch (err) {
      navigate("/error");
    }
  };

  const handleDelete = async () => {
    try {
      
      await deleteWineWishListService(id, loggedUser._id);

    } catch (err) {
      navigate("/error");
    }
  };

  return <button onClick={handleDelete}>Borrar</button>;
}

export default DeleteWineWishList;
