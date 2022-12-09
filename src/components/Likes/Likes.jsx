import { useState, useEffect } from 'react';
import './likes.css'
import gsap from 'gsap';
import { BsHeartFill, BsHeart } from 'react-icons/bs'
import { addLikesService } from '../../services/wines.services'
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { useNavigate, useParams } from 'react-router-dom';


function Likes({ wineDetail, reload }) {

  const { user: loggedUser } = useContext(AuthContext)
  const { id } = useParams();
  const navigate = useNavigate();

  const [ likedWine, setLikedWine ] = useState(false);
  const [ likesId, setLikesId ] = useState(wineDetail.likes)

  useEffect(() => {
    checkIfWineLiked()
  }, [likesId])

  const checkIfWineLiked = () => {
 
    const filterArr = likesId.filter(each => each === loggedUser._id)

    if( filterArr.toString() === loggedUser._id ) {
      setLikedWine(true)
    }
  }

  // Animation likes from GSAP
  const onEnter = () => {
    gsap.to('.heart', { scale: 1.5 });
  };
  const onLeave = () => {
    gsap.to('.heart', { scale: 1 });
  };

  const handleLike = async (e) => {
    e.preventDefault()
    setLikedWine(!likedWine)

    try {
      // Call the likes route from the DB
      await addLikesService(id, loggedUser._id)
      //Reload the data of the wine
      await reload()
      
    } catch(err) {
      navigate('/error')
    }
  }

  return (

    <div className='container-likes'>
        {likedWine ? <BsHeartFill className='heart' style={{color: 'red'}} type='submit' onClick={handleLike} onMouseEnter={onEnter} onMouseLeave={onLeave}  /> : <BsHeart  className='heart' style={{color: '#b9b8b8'}} type='submit' onClick={handleLike} onMouseEnter={onEnter} onMouseLeave={onLeave} /> }
        {wineDetail.likes.length === 1 ? <span className='txt-like' >A <strong>{wineDetail.likes.length}</strong> persona le gusta este vino</span> : <span className='txt-like'>A <strong>{wineDetail.likes.length}</strong> personas les gusta este vino</span>}
    </div>
  )
}

export default Likes

