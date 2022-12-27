import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { addWineToWishListService } from "../../services/auth.service";
import toast, { Toaster } from "react-hot-toast";

function WishList() {
  const { user: loggedUser } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [addWishList, setAddWishList] = useState(null);

  const addWineToWishList = async () => {
    toast.success("Añadido a favoritos");

    try {
      const { data } = await addWineToWishListService(id, loggedUser._id);
      setAddWishList(data.wishlist);
      console.log(addWishList);
    } catch (err) {
      navigate("/error");
    }
  };

  // if ( !addWishList ) {
  //   return <h3>...Loading</h3>
  // }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      {!addWishList ? <button onClick={addWineToWishList}>Añadir a la wishlist</button> : <button disabled={true} onClick={addWineToWishList}>Añadir a la wishlist</button>
      
      
      }
    </>
  );
}

export default WishList;
