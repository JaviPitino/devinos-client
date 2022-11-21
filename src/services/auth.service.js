import service from "./config.services";

// Servicio para registrar el usuario
const signupService = (user) => {
  return service.post("/auth/signup", user)
}

// Servicio ipara hacer login a un usuario
const loginService = (user) => {
  return service.post("/auth/login", user)
}

// autenticación del usuario
const verifyService = () => {
  return service.get("/auth/verify")
}

// Servicio para editar el perfil
const editProfileService = (id, updateUser) =>{
  return service.patch(`/profile/${id}/edit`, updateUser)
}

// Mostramos detalles del perfil del usuario
const getProfileDetailsService = (id) => {
  return service.get(`/profile/${id}`)
}

export { signupService, loginService, verifyService, editProfileService, getProfileDetailsService }