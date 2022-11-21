import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import { getProfileDetailsService } from '../../services/auth.service'

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
    <div>
      <h3>User: {profileDetails.username[0].toUpperCase() + profileDetails.username.slice(1)}</h3>
      <img src={profileDetails.image} alt="imagen perfil" width={50} />
    </div>
  )
}

export default Profile