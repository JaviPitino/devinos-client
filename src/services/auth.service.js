import service from "./config.services";

// Servicio para registrar el usuario
const signupService = (user) => {
  return service.post("/auth/signup", user);
};

// Servicio ipara hacer login a un usuario
const loginService = (user) => {
  return service.post("/auth/login", user);
};

// autenticación del usuario
const verifyService = () => {
  return service.get("/auth/verify");
};

// Mostramos detalles del perfil del usuario
const getProfileDetailsService = (id) => {
  return service.get(`/profile/${id}`);
};

// Servicio para editar el perfil
const editProfileService = (id, updateUser) => {
  return service.patch(`/profile/${id}/edit`, updateUser);
};

// Mostrar wishlist por usuario
const getWishlistService = (id) => {
  return service.get(`/profile/wishlist/${id}`);
};

// Añadir elemento a la wishlist del usuario
const addWineToWishListService = (id, wishlist) => {
  return service.patch(`/profile/wishlist/${id}`, wishlist);
};

// Eliminar elemento de la wishlist del usuario
const deleteWineWishListService = (id, wishlist) => {
  return service.patch(`profile/wishlist/${id}/delete`, wishlist);
};

export {
  signupService,
  loginService,
  verifyService,
  editProfileService,
  getProfileDetailsService,
  getWishlistService,
  addWineToWishListService,
  deleteWineWishListService
};
