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

export { winesListService, getWineDetailsService, addNewWineService }