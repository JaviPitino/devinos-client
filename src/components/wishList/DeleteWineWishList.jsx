import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import {
  getWishlistService,
  deleteWineWishListService,
} from "../../services/auth.service";

function DeleteWineWishList() {

  const [winesWished, setWineWished] = useState([]);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    showItemsWishlist();
  }, []);

  const showItemsWishlist = async () => {
    try {
      const { data } = await getWishlistService(id, user._id);
      setWineWished(data.wishlist);
    } catch (err) {
      navigate("/error");
    }
  };

  const handleDelete = async () => {
    try {
      
      await deleteWineWishListService(id, user._id);

    } catch (err) {
      navigate("/error");
    }
  };

  return <button onClick={handleDelete}>Borrar</button>;
}

export default DeleteWineWishList;
