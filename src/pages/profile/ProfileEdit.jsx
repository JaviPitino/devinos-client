import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editProfileService, getProfileDetailsService } from "../../services/auth.service"
import uploadService from "../../services/profile.service"


function ProfileEdit() {

  const navigate = useNavigate()

  const { id } = useParams()

  // **** ESTADOS ****
  const [ username, setUsername ] = useState("")
  const [ email, setEmail ] = useState("");
  const [ image, setImage ] = useState()

  // **** HANDLERS ****
  const handleUsername = (e) => setUsername(e.target.value)
  const handleEmail = (e) => setEmail(e.target.value)

  // **** COMPONENTDIDMOUNT ****
  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {

    try {

      const response = await getProfileDetailsService()
      setUsername( response.data.username )
      setEmail( response.data.email )
      setImage( response.data.image )

    } catch(err) {
      navigate("/error")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const updateProfile = {
        username, email, image
      }

      await editProfileService(id, updateProfile);
      navigate("/profile")

    } catch(err) {
      navigate("/error")
    }
  }

  const handleImageChange = async (e) => {

    const uploadForm = new FormData()
    uploadForm.append("image", e.target.files[0])

    try {

      const response = await uploadService(uploadForm);
      setImage(response.data)

    } catch(err) {
      navigate("/error")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Usuario: </label>
        <input type="text" name="username" onChange={handleUsername} value={username} />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" onChange={handleEmail} value={email} />
        <br />
        <label htmlFor="image">Imagen: </label>
        <input type="file" name="image" onChange={handleImageChange} />
        <img src={image} alt="imagen perfil" width={50} />
        <br />
        <button>Actualizar</button>
      </form>
    </div>
  )
}

export default ProfileEdit