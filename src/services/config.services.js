import axios from "axios";

// Llamadas al BE
const service = axios.create({
  // baseURL: `${process.env.REACT_APP_SERVER_URL}/api`
  baseURL: `https://devinos-backend.onrender.com/`
})

// Aquí se envía el Token al BE
service.interceptors.request.use((config) => {

  // Busca el Token en el LocalStorage
  const authToken = localStorage.getItem("authToken")

  if ( authToken ) {
    config.headers = {
      authorization: `Bearer ${authToken}`
    }
  }
  return config
})

export default service