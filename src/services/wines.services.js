import service from "./config.services";

const winesListService = () => {
  return service.get("/wines")
};

const getWineDetailsService = (id) => {
  return service.get(`/wines/${id}`)
}

const addNewWineService = (newWine) => {
  return service.post('/wines', newWine)
}

const editWineService = (id, theWine) => {
  return service.patch(`/wines/${id}`, theWine)
}

const deleteWineService = ( id ) => {
  return service.delete(`/wines/${id}`)
}

const addLikesService = ( id, user ) => {
  return service.patch(`/wines/${id}/likes`, user)
}

// const getLikesOfWines = (id, user) => {
//   return service.get(`/wines/${id}/likes`, user)
// }

export { winesListService, getWineDetailsService, addNewWineService, editWineService, deleteWineService, addLikesService }