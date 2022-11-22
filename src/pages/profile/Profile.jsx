import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import { getProfileDetailsService } from '../../services/auth.service'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

function Profile() {

  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [ profileDetails, setProfileDetails ] = useState(null)

  useEffect(() => {
    getProfileDetails()
  }, [])

  const getProfileDetails = async () => {

    try {
      const response = await getProfileDetailsService(user._id)
      
      setProfileDetails(response.data)

    } catch(err) {
      navigate('/error')
    }
  } 
  
  if (!profileDetails) {
    return <h3>...Loading...</h3>
  }

  return (
    <div className="container-perfil">
      {/* <p>Hola: </p>
      <h4 className='saludo'> {profileDetails.username[0].toUpperCase() + profileDetails.username.slice(1)}</h4>
      <img className="saludo" src={profileDetails.image} alt="imagen perfil" width={30} /> */}
      {user !== null && (
        <div className="container-perfil">
          <h4 className="saludo">
            {profileDetails.username[0].toUpperCase() + profileDetails.username.slice(1)} 
          </h4>{" "}
          <img className="saludo" src={profileDetails.image} alt="imagen perfil" width={25}/>
        <NavLink to={`/profile/${profileDetails._id}/edit`} className="saludo"><FontAwesomeIcon icon={faPenToSquare} /></NavLink> 
        </div>
      )}
    </div>
  )
}

export default Profile