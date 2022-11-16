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

export { signupService, loginService, verifyService }