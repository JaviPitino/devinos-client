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

export { winesListService, getWineDetailsService, addNewWineService, editWineService }