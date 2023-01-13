import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { addWineToWishListService } from "../../services/auth.service";
import { getProfileDetailsService } from "../../services/auth.service"
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'

function WishList({wineDetail}) {

  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado que sirva de interruptor
  const [ wishedWine, setWishedWine ] = useState(false);
  // Estado para mantener actualizado el usuario
  const [ userWish, setUserWish ] = useState([]) 

  // Chequea si el usuario ya tiene el vino en la lista de favoritos
  // Montamos el componente y lo mantenemos actualizado con 'userWish'
  useEffect(() => {
    checkIsWineIsWishlist()
  }, [userWish])

 // Check para ver si el id del wishlist del usuario es igual al id del vino
  const checkIsWineIsWishlist = () => {

    const filterArr = userWish.filter(each => each === wineDetail._id)

    // Si es el mismo id, cambia el estado a true
    if ( filterArr.toString() === wineDetail._id ) {
      setWishedWine(true)
    }
  }

  // Montamos el componente con los datos del usuario
  useEffect(() => {
    getUserData()
  }, [])

  // Llamamos a la DB para obtener los datos del usuario por su id
  const getUserData = async () => {
    try {
      const { data } = await getProfileDetailsService(user._id)
      setUserWish(data.wishlist)
   
    } catch(err) {
      navigate('/error')
    }
  }

  // Evento handle que da la instrucción al botón de añadir
  const handleWish = async (e) => {
    e.preventDefault()
    // Actualizamos el estado con lo contrario de lo que esté
    setWishedWine(!wishedWine)
    if (wishedWine === true) {
      toast.error('Borrado de favoritos')
    } else {
      toast.success("Añadido a favoritos");
    }

    try {

      // Call the wishlist route from the DB
      await addWineToWishListService(id, wineDetail._id)

      // Reload the data of the User
      setUserWish(userWish)

    } catch(err) {
      navigate('/error')
    }
  }

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
          duration: 2000,
          style: {
            background: "#5e2129",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 2000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      {!wishedWine ? <BsBookmark className='bookmark' type='submit' onClick={handleWish} style={{color: '#b8b8b8', width: '25px'}}>Añadir a la wishlist</BsBookmark> : <BsBookmarkFill  className='bookmark' type='submit' onClick={handleWish} style={{color: '#bb1919', width: '25px'}}>Añadido</BsBookmarkFill>
      }
    </>
  );
}

export default WishList;
